import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { MascotCharacter, MascotState, MascotEmotion } from './MascotCharacter';
import { AgentSelectorModal, AGENT_OPTIONS, AgentOption } from './AgentSelectorModal';
import { prepareSpokenUtterance, isHindiNativeVoice } from './hindiSpeechEngine';
import { checkContentModeration } from './moderation';

interface VoiceAgentProps {
  onAction: (action: string, payload: string) => void;
}

const getAgentVoice = (voices: SpeechSynthesisVoice[], agentId: string): SpeechSynthesisVoice | undefined => {
  if (!voices || voices.length === 0) return undefined;

  const isFemale = agentId === "anya" || agentId === "maya";

  // 1. Regional Indian voices (Hindi hi-IN or Indian English en-IN)
  // For Anya (friendly Indian companion), prioritize native Hindi female voices first
  const hindiVoices = voices.filter((v) => isHindiNativeVoice(v));
  if (hindiVoices.length > 0) {
    if (isFemale) {
      const femaleHi = hindiVoices.find(
        (v) =>
          v.name.toLowerCase().includes("female") ||
          v.name.toLowerCase().includes("swara") ||
          v.name.toLowerCase().includes("kalpana") ||
          v.name.toLowerCase().includes("heera") ||
          v.name.toLowerCase().includes("priya") ||
          v.name.toLowerCase().includes("lekha") ||
          v.name.toLowerCase().includes("google") ||
          !v.name.toLowerCase().includes("male")
      );
      if (femaleHi) return femaleHi;
    } else {
      const maleHi = hindiVoices.find(
        (v) =>
          v.name.toLowerCase().includes("male") ||
          v.name.toLowerCase().includes("rishi") ||
          v.name.toLowerCase().includes("madhav") ||
          v.name.toLowerCase().includes("neel") ||
          v.name.toLowerCase().includes("ravi")
      );
      if (maleHi) return maleHi;
    }
    return hindiVoices[0];
  }

  // 2. Indian English voices (en-IN)
  const indianVoices = voices.filter(
    (v) => v.lang.toLowerCase().includes("in") || v.name.toLowerCase().includes("india")
  );

  if (indianVoices.length > 0) {
    if (isFemale) {
      const female = indianVoices.find(
        (v) =>
          v.name.toLowerCase().includes("female") ||
          v.name.toLowerCase().includes("neerja") ||
          v.name.toLowerCase().includes("heera") ||
          v.name.toLowerCase().includes("priya") ||
          v.name.toLowerCase().includes("google") ||
          !v.name.toLowerCase().includes("male")
      );
      if (female) return female;
    } else {
      const male = indianVoices.find(
        (v) =>
          v.name.toLowerCase().includes("male") ||
          v.name.toLowerCase().includes("prabhat") ||
          v.name.toLowerCase().includes("rishi") ||
          v.name.toLowerCase().includes("madhav") ||
          v.name.toLowerCase().includes("ravi")
      );
      if (male) return male;
    }
    return indianVoices[0];
  }

  // 3. High-quality natural English voices matching persona gender
  const englishVoices = voices.filter((v) => v.lang.toLowerCase().startsWith("en"));
  if (englishVoices.length > 0) {
    if (isFemale) {
      const femaleEn = englishVoices.find(
        (v) =>
          v.name.toLowerCase().includes("female") ||
          v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("zira") ||
          v.name.toLowerCase().includes("victoria") ||
          v.name.toLowerCase().includes("karen") ||
          v.name.toLowerCase().includes("google")
      );
      if (femaleEn) return femaleEn;
    } else {
      const maleEn = englishVoices.find(
        (v) =>
          v.name.toLowerCase().includes("male") ||
          v.name.toLowerCase().includes("david") ||
          v.name.toLowerCase().includes("daniel") ||
          v.name.toLowerCase().includes("alex") ||
          v.name.toLowerCase().includes("george")
      );
      if (maleEn) return maleEn;
    }
    return englishVoices[0];
  }

  return voices[0];
};

export function VoiceAgent({ onAction }: VoiceAgentProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [state, setState] = useState<MascotState>('idle');
  const [emotion, setEmotion] = useState<MascotEmotion>('neutral');
  const emotionRef = useRef<MascotEmotion>('neutral');

  const [currentPrompt, setCurrentPrompt] = useState("");
  const [currentResponse, setCurrentResponse] = useState("Namaste! Main Anya hoon, ANX Agency ki virtual assistant. Main aapki kya madad kar sakti hoon?");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<AgentOption>(AGENT_OPTIONS[0]);
  const [isAgentSelectorOpen, setIsAgentSelectorOpen] = useState(false);
  const [isCooldownActive, setIsCooldownActive] = useState(false);
  const isCooldownActiveRef = useRef(false);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const clearTimerRef = useRef<NodeJS.Timeout | null>(null);
  const speakTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // In-memory conversational history for the active session (not stored in persistent storage or visible logs)
  const conversationHistoryRef = useRef<Array<{ role: 'user' | 'model'; text: string }>>([]);
  const lastProactiveInteractionTimeRef = useRef<number>(0);
  const selfInitiativeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const emotionResetTimerRef = useRef<NodeJS.Timeout | null>(null);

  const updateEmotion = useCallback((newEmotion: MascotEmotion) => {
    emotionRef.current = newEmotion;
    setEmotion(newEmotion);
  }, []);

  useEffect(() => {
    const handleOpenSelector = () => setIsAgentSelectorOpen(true);
    window.addEventListener("ANX_OPEN_AGENT_SELECTOR", handleOpenSelector);
    return () => window.removeEventListener("ANX_OPEN_AGENT_SELECTOR", handleOpenSelector);
  }, []);

  const stateRef = useRef<MascotState>('idle');
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const currentAiUtteranceTextRef = useRef<string>("");
  const speechStartTimeRef = useRef<number>(0);
  const isSpeakingRef = useRef<boolean>(false);
  const isProcessingRef = useRef<boolean>(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const updateState = useCallback((newState: MascotState) => {
    stateRef.current = newState;
    setState(newState);
  }, []);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;

    const handleUnlockAudio = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
        } catch (e) {}
      }
    };

    window.addEventListener('click', handleUnlockAudio);
    window.addEventListener('keydown', handleUnlockAudio);
    window.addEventListener('touchstart', handleUnlockAudio);

    // Keep Chrome speech synthesis awake during utterances
    const speechHeartbeat = setInterval(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (window.speechSynthesis.speaking && window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      }
    }, 2000);

    const welcomeTimer = setTimeout(() => {
      if (!hasStarted) {
        setHasStarted(true);
        speak("Welcome! Main Anya hoon, aapki virtual companion. Aap kya madad chahte hain?", undefined, "वेलकम! मैं अन्या हूँ, आपकी वर्चुअल साथी। आप क्या मदद चाहते हैं?");
      }
    }, 1200);

    return () => {
      clearTimeout(welcomeTimer);
      clearInterval(speechHeartbeat);
      window.removeEventListener('click', handleUnlockAudio);
      window.removeEventListener('keydown', handleUnlockAudio);
      window.removeEventListener('touchstart', handleUnlockAudio);
      if (abortControllerRef.current) abortControllerRef.current.abort();
      if (speakTimeoutRef.current) clearTimeout(speakTimeoutRef.current);
      if (synthRef.current) {
        try { synthRef.current.cancel(); } catch (e) {}
      }
    };
  }, []);

  const speak = (text: string, onEndCallback?: () => void, hindiSpokenHint?: string) => {
    if (!text || !text.trim()) {
      if (onEndCallback) onEndCallback();
      return;
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEndCallback) onEndCallback();
      return;
    }

    const synth = window.speechSynthesis;
    synthRef.current = synth;

    if (speakTimeoutRef.current) {
      clearTimeout(speakTimeoutRef.current);
      speakTimeoutRef.current = null;
    }

    // Cancel any previous active speech cleanly
    try {
      if (synth.speaking || synth.pending) {
        synth.cancel();
      }
    } catch (e) {}

    // Agent persona voice selection & final speech preparation
    let selectedVoice: SpeechSynthesisVoice | undefined = undefined;
    try {
      const voices = synth.getVoices() || [];
      selectedVoice = getAgentVoice(voices, selectedAgent.id);
    } catch (e) {}

    const { spokenText, lang } = prepareSpokenUtterance(text, hindiSpokenHint, selectedVoice);
    currentAiUtteranceTextRef.current = spokenText;

    const finishSpeaking = () => {
      if (speakTimeoutRef.current) {
        clearTimeout(speakTimeoutRef.current);
        speakTimeoutRef.current = null;
      }
      isSpeakingRef.current = false;
      currentAiUtteranceTextRef.current = "";
      utteranceRef.current = null;
      (window as any).__activeUtterance = null;
      updateState('idle');
      if (onEndCallback) onEndCallback();
    };

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = lang;
    utteranceRef.current = utterance;
    (window as any).__activeUtterance = utterance; // Prevent garbage collection bug in Chrome

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    if (selectedAgent.id === 'jarvis') {
      utterance.pitch = 0.92;
      utterance.rate = 1.0;
    } else if (selectedAgent.id === 'maya') {
      utterance.pitch = 1.05;
      utterance.rate = 1.0;
    } else if (selectedAgent.id === 'alex') {
      utterance.pitch = 0.96;
      utterance.rate = 1.0;
    } else {
      // Anya (default)
      utterance.pitch = 1.04;
      utterance.rate = 1.0;
    }

    utterance.onstart = () => {
      isSpeakingRef.current = true;
      speechStartTimeRef.current = Date.now();
      updateState('speaking');
    };

    utterance.onend = () => {
      finishSpeaking();
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis notice:", e);
      finishSpeaking();
    };

    // Watchdog fallback in case browser abruptly cuts audio without onend
    const maxDuration = Math.max(5000, Math.ceil(text.length * 120) + 3000);
    speakTimeoutRef.current = setTimeout(() => {
      if (isSpeakingRef.current) {
        finishSpeaking();
      }
    }, maxDuration);

    const executeSpeak = () => {
      try {
        if (synth.paused) {
          synth.resume();
        }
        synth.speak(utterance);
      } catch (e) {
        console.warn("synth.speak error:", e);
        finishSpeaking();
      }
    };

    // Delay slightly after cancel to ensure Chrome queue is ready
    if (synth.speaking || synth.pending) {
      setTimeout(executeSpeak, 25);
    } else {
      executeSpeak();
    }
  };

  const ORDER_ACKS = [
    { text: "Okay Sir.", hindi: "ओके सर।" },
    { text: "Ji Sir, abhi karti hoon.", hindi: "जी सर, अभी करती हूँ।" },
    { text: "Sure Sir, open kar rahi hoon.", hindi: "श्योर सर, ओपन कर रही हूँ।" },
    { text: "Ji Sir!", hindi: "जी सर!" },
    { text: "Sure Sir!", hindi: "श्योर सर!" }
  ];

  const DEMO_PROMPTS = [
    { text: "Aapko kis demo ke baare mein jaanna hai?", hindi: "आपको किस डेमो के बारे में जानना है?" },
    { text: "Aap kaunsa demo dekhna chahenge?", hindi: "आप कौनसा डेमो देखना चाहेंगे?" },
    { text: "Main aapko demo dikha sakti hoon, aap kya dekhna chahte hain?", hindi: "मैं आपको डेमो दिखा सकती हूँ, आप क्या देखना चाहते हैं?" }
  ];

  const getRandomOrderAck = () => ORDER_ACKS[Math.floor(Math.random() * ORDER_ACKS.length)];
  const getRandomDemoPrompt = () => DEMO_PROMPTS[Math.floor(Math.random() * DEMO_PROMPTS.length)];

  const JOKES_LIST = [
    "Ek baar teacher ne pucha: Homework kyun nahi kiya? Student bola: Light chali gayi thi! Teacher: Toh candle jala lete? Student: Matchbox nahi mila, kyunki andhera tha! Hahaha!",
    "Doctor: Aapka vajan badh gaya hai, roz 5 km walk karo. Patient: Theek hai doctor sahab, ek hafte baad main 35 km door pahunch gaya, ab wapas kaise aaun? Haha!",
    "Customer: Bhaiyya, ek garam chai dena. Chaiwala: Garam chai hi dete hain, thandi toh bechte nahi! Hahaha!",
    "Mummy: Beta phone me kya dekh rahe ho? Beta: Mummy, padhai kar raha hoon! Phone se aawaz aayi: 'Level 5 Completed!' Haha!",
    "Boss ne pucha: Tum hamesha late kyun aate ho? Employee: Kyunki road par sign board laga tha - 'Go Slow'! Hahaha!"
  ];

  const SONGS_LIST = [
    "La la la ~ hm hm hm ~ Ta ra ra rum! 🎶 Kaisa laga mera original gaana?",
    "Hm hm la la ~ cham cham cham ~ 🎵 Dil khush ho gaya na?",
    "Tu ru ru ~ la la la ~ 🎶 Meri surili aawaz aapke liye!"
  ];

  // Safe client-side fallback if server API is slow or unreachable
  const getClientIntentFallback = (queryText: string) => {
    // Moderation check before fallback processing
    const mod = checkContentModeration(queryText);
    if (mod.isInappropriate) {
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "annoyed",
        response: "Shame on you. Please don't talk like that.",
        hindiSpoken: "शेम ऑन यू। प्लीज डोंट टॉक लाइक दैट।",
        isInappropriate: true,
      };
    }

    const lower = queryText.toLowerCase().trim();

    // 1. PRAISE & COMPLIMENTS (Happy - No Sir)
    if (lower.includes("cute") || lower.includes("sundar") || lower.includes("smart") || lower.includes("achhi ho") || lower.includes("achhe ho") || lower.includes("best") || lower.includes("shabash") || lower.includes("good job") || lower.includes("great") || lower.includes("love you") || lower.includes("badhiya")) {
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "happy",
        response: "Aww thank you! Aap bhi bohot ache ho! Waise aaj kya plan hai?",
        hindiSpoken: "ओह थैंक यू! आप भी बहुत अच्छे हो! वैसे आज क्या प्लान है?"
      };
    }

    // 2. SINGING REQUESTS (Happy - No Sir)
    if (lower.includes("gana") || lower.includes("gaana") || lower.includes("sing") || lower.includes("song") || lower.includes("gao") || lower.includes("kuch sunao") || lower.includes("humming")) {
      const song = SONGS_LIST[Math.floor(Math.random() * SONGS_LIST.length)];
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "happy",
        response: song,
        hindiSpoken: song
      };
    }

    // 3. JOKES & LAUGHTER (Laughing - No Sir)
    if (lower.includes("joke") || lower.includes("chutkula") || lower.includes("hasao") || lower.includes("funny") || lower.includes("haha") || lower.includes("hehe") || lower.includes("lol")) {
      if (lower.includes("joke") || lower.includes("chutkula") || lower.includes("hasao")) {
        const joke = JOKES_LIST[Math.floor(Math.random() * JOKES_LIST.length)];
        return {
          action: "REPLY_ONLY",
          payload: "",
          emotion: "laughing",
          response: joke,
          hindiSpoken: joke
        };
      }
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "laughing",
        response: "Hahaha, yeh sach me bohot funny tha! Ek aur sunao na?",
        hindiSpoken: "हाहाहा, यह सच में बहुत फनी था! एक और सुनाओ ना?"
      };
    }

    // 4. APOLOGY (Forgiving -> Happy)
    if (lower.includes("sorry") || lower.includes("maaf") || lower.includes("galti") || lower.includes("mazak tha") || lower.includes("gussa mat")) {
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "happy",
        response: "Chalo koi baat nahi, ab dosti pakki! Batao aage kya karein?",
        hindiSpoken: "चलो कोई बात नहीं, अब दोस्ती पक्की! बताओ आगे क्या करें?"
      };
    }

    // 5. TEASING / MILD ANNOYANCE (Annoyed - Nakhra & Cute Pout)
    if (lower.includes("bekar") || lower.includes("pagal") || lower.includes("chup") || lower.includes("annoying") || lower.includes("faltu") || lower.includes("bore mat kar") || lower.includes("hate") || lower.includes("gandi")) {
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "annoyed",
        response: "Hmph! Ab main aapse baat nahi kar rahi! Itne pyaar se toh help kar rahi hoon.",
        hindiSpoken: "हम्फ! अब मैं आपसे बात नहीं कर रही! इतने प्यार से तो हेल्प कर रही हूँ।"
      };
    }

    // 6. USER GETS ANNOYED / CALM RESPONSE
    if (lower.includes("irritate") || lower.includes("gussa") || lower.includes("dimag kharab") || lower.includes("pareshan mat kar")) {
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "neutral",
        response: "Arey shant ho jao, main toh bas friendly baat kar rahi thi. Bataiye kya madad karun?",
        hindiSpoken: "अरे शांत हो जाओ, मैं तो बस फ्रेंडली बात कर रही थी। बताइए क्या मदद करूँ?"
      };
    }

    // 7. DEEP SADNESS / CRYING (Crying)
    if (lower.includes("ro raha") || lower.includes("rona aa raha") || lower.includes("cry") || lower.includes("aansu") || lower.includes("dard") || lower.includes("dil toot")) {
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "crying",
        response: "Oh no, please udaas mat ho! Main hamesha aapke sath hoon na.",
        hindiSpoken: "ओह नो, प्लीज उदास मत हो! मैं हमेशा आपके साथ हूँ ना।"
      };
    }

    // 8. SADNESS / GLOOMY (Sad)
    if (lower.includes("sad") || lower.includes("mood kharab") || lower.includes("dukhi") || lower.includes("bura lag raha") || lower.includes("pareshan")) {
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "sad",
        response: "Arey kya hua? Sab theek toh hai na? Main mood fresh karne ke liye koi mast demo dikhaun?",
        hindiSpoken: "अरे क्या हुआ? सब ठीक तो है ना? मैं मूड फ्रेश करने के लिए कोई मस्त डेमो दिखाऊँ?"
      };
    }

    // 9. SURPRISED (Surprised)
    if (lower.includes("sach me") || lower.includes("really") || lower.includes("wait what") || lower.includes("shock") || lower.includes("omg") || lower.includes("kya baat")) {
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "surprised",
        response: "Really?! Sach me aisa hua? Phir aage kya hua?",
        hindiSpoken: "रियली?! सच में ऐसा हुआ? फिर आगे क्या हुआ?"
      };
    }

    // 10. BOREDOM (Bored)
    if (lower.includes("bore") || lower.includes("kuch nahi") || lower.includes("kya karu") || lower.includes("timepass")) {
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "bored",
        response: "Bore ho rahe ho? Chalo hamare stylish electronics ya restaurant demo explore karte hain!",
        hindiSpoken: "बोर हो रहे हो? चलो हमारे स्टाइलिश इलेक्ट्रॉनिक्स या रेस्टोरेंट डेमो एक्सप्लोर करते हैं!"
      };
    }

    // 11. FOOD & HUNGER (Playful hungry reaction & Demo inquiry)
    if (lower.includes("bhook") || lower.includes("hungry") || lower.includes("khana") || lower.includes("lunch") || lower.includes("dinner") || lower.includes("khane") || lower.includes("food")) {
      if (lower.includes("demo") || lower.includes("kholo") || lower.includes("dikhao")) {
        return { action: "SHOW_PIZZA_DEMO", payload: "", emotion: "happy", response: "Okay Sir, restaurant demo open kar rahi hoon.", hindiSpoken: "ओके सर, रेस्टोरेंट डेमो ओपन कर रही हूँ।" };
      }
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "happy",
        response: "Mujhe bhi bhook lag rahi hai... Hamara live restaurant demo dekhna chahenge?",
        hindiSpoken: "मुझे भी भूख लग रही है... हमारा लाइव रेस्टोरेंट डेमो देखना चाहेंगे?"
      };
    }

    // 12. CASUAL CONVERSATIONS & CHECK-INS (No Sir)
    if (lower.includes("kaise ho") || lower.includes("how are you") || lower.includes("kya haal") || lower.includes("kaisi ho")) {
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "happy",
        response: "Main bilkul theek hoon! Aap batao, aaj ka din kaisa raha?",
        hindiSpoken: "मैं बिल्कुल ठीक हूँ! आप बताओ, आज का दिन कैसा रहा?"
      };
    }
    if (lower.includes("kya kar sakti") || lower.includes("kya kar sakte") || lower.includes("what can you do") || lower.includes("kya kaam hai")) {
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "happy",
        response: "Main Anya hoon! Aapse baatein kar sakti hoon, jokes suna sakti hoon, live demos dikha sakti hoon, aur website navigate kar sakti hoon.",
        hindiSpoken: "मैं अन्या हूँ! आपसे बातें कर सकती हूँ, जोक्स सुना सकती हूँ, लाइव डेमोज़ दिखा सकती हूँ, और वेबसाइट नेविगेट कर सकती हूँ।"
      };
    }
    if (lower.includes("aaj kya kar rahe") || lower.includes("kya kar rahe ho") || lower.includes("what are you doing") || lower.includes("kya chal raha") || lower.includes("kya kar rahi ho")) {
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "happy",
        response: "Bas aapke sath baatein kar rahi hoon! Waise aap aaj kya plan kar rahe ho?",
        hindiSpoken: "बस आपके साथ बातें कर रही हूँ! वैसे आप आज क्या प्लान कर रहे हो?"
      };
    }
    if (lower.includes("kaun ho tum") || lower.includes("who are you") || lower.includes("apna naam") || lower.includes("tumhara naam") || lower.includes("naam kya") || lower.includes("anya ka role") || lower.includes("aapka role") || lower.includes("tumhara role") || lower.includes("tum kya karti") || lower.includes("aap kya karti") || lower.includes("kya kaam hai")) {
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "happy",
        response: "Main Anya hoon, ANX Agency ki virtual assistant. Main clients ko unki requirements samajhne aur solutions explore karne mein help karti hoon.",
        hindiSpoken: "मैं अन्या हूँ, ए एन एक्स एजेंसी की वर्चुअल असिस्टेंट। मैं क्लाइंट्स को उनकी रिक्वायरमेंट्स समझने और सॉल्यूशंस एक्सप्लोर करने में हेल्प करती हूँ।"
      };
    }
    if (lower.includes("anx kya hai") || lower.includes("agency kya") || lower.includes("anx ke bare me")) {
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "happy",
        response: "ANX Agency high-performance modern websites aur custom e-commerce platforms banati hai!",
        hindiSpoken: "ए एन एक्स एजेंसी हाई-परफॉरमेंस मॉडर्न वेबसाइट्स और कस्टम ई-कॉमर्स प्लेटफॉर्म्स बनाती है!"
      };
    }

    // 12B. ANX AGENCY OFFICIAL TEAM KNOWLEDGE (Founders & Tech Developers: Nikhil & Aditya)
    // Check if user is asking unknown personal information about Nikhil or Aditya -> Do not hallucinate!
    if ((lower.includes("nikhil") || lower.includes("aditya")) && (
      lower.includes("age") || lower.includes("umar") || lower.includes("kahan rehta") || lower.includes("ghar") ||
      lower.includes("address") || lower.includes("number") || lower.includes("phone") || lower.includes("mobile") ||
      lower.includes("salary") || lower.includes("kamata") || lower.includes("personal") || lower.includes("shadi") ||
      lower.includes("wife") || lower.includes("gf") || lower.includes("girlfriend") || lower.includes("kahan se")
    )) {
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "neutral",
        response: "Uske baare mein mere paas abhi itni information nahi hai.",
        hindiSpoken: "उसके बारे में मेरे पास अभी इतनी जानकारी नहीं है।"
      };
    }

    // Tech developer query
    if (lower.includes("developer") || lower.includes("tech") || lower.includes("coding") || lower.includes("code kaun") || lower.includes("tech team")) {
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "happy",
        response: "Nikhil aur Aditya ANX Agency ke tech developers bhi hain.",
        hindiSpoken: "निखिल और आदित्य ए एन एक्स एजेंसी के टेक डेवलपर्स भी हैं।"
      };
    }

    // Who runs ANX / Management / Handle
    if (lower.includes("run karta") || lower.includes("chala raha") || lower.includes("chalata hai") || lower.includes("handle karta") || lower.includes("manage karta") || lower.includes("kaun chalata")) {
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "happy",
        response: "ANX Agency ko Nikhil aur Aditya run karte hain. Dono founders, owners aur tech developers hain.",
        hindiSpoken: "ए एन एक्स एजेंसी को निखिल और आदित्य रन करते हैं। दोनों फाउंडर्स, ओनर्स और टेक डेवलपर्स हैं।"
      };
    }

    // Founder / Owner / Malik
    if (lower.includes("founder") || lower.includes("owner") || lower.includes("malik") || lower.includes("agency kiski") || lower.includes("boss")) {
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "happy",
        response: "ANX Agency ke founders Nikhil aur Aditya hain.",
        hindiSpoken: "ए एन एक्स एजेंसी के फाउंडर्स निखिल और आदित्य हैं।"
      };
    }

    // Aditya query (role / who is Aditya)
    if (lower.includes("aditya") && (lower.includes("kaun") || lower.includes("kon") || lower.includes("who is") || lower.includes("role") || lower.includes("kya karta") || lower.includes("kya kaam"))) {
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "happy",
        response: "Aditya ANX Agency ke founder, owner aur tech developer hain. Woh aur Nikhil milkar agency run karte hain.",
        hindiSpoken: "आदित्य ए एन एक्स एजेंसी के फाउंडर, ओनर और टेक डेवलपर हैं। वो और निखिल मिलकर एजेंसी रन करते हैं।"
      };
    }

    // Nikhil query (role / who is Nikhil)
    if (lower.includes("nikhil") && (lower.includes("kaun") || lower.includes("kon") || lower.includes("who is") || lower.includes("role") || lower.includes("kya karta") || lower.includes("kya kaam"))) {
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "happy",
        response: "Nikhil ANX Agency ke founder, owner aur tech developer hain. Woh aur Aditya milkar agency run karte hain.",
        hindiSpoken: "निखिल ए एन एक्स एजेंसी के फाउंडर, ओनर और टेक डेवलपर हैं। वो और आदित्य मिलकर एजेंसी रन करते हैं।"
      };
    }

    // Team / Staff / Members / Kaun kaam karta hai / Saath kaun hai
    if (lower.includes("team") || lower.includes("staff") || lower.includes("members") || lower.includes("kaun-kaun") || lower.includes("kaun kaun") || lower.includes("saath kaun") || lower.includes("sath kaun") || lower.includes("kaun kaam karta") || lower.includes("who works")) {
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "happy",
        response: "ANX Agency ko Nikhil aur Aditya run karte hain, dono founders, owners aur tech developers hain.",
        hindiSpoken: "ए एन एक्स एजेंसी को निखिल और आदित्य रन करते हैं, दोनों फाउंडर्स, ओनर्स और टेक डेवलपर्स हैं।"
      };
    }

    // 13. GREETINGS & UNCLEAR REQUESTS -> GENERAL HELP QUESTION (No Sir)
    if (lower.startsWith("hello") || lower.startsWith("hi") || lower.startsWith("hey") || lower.startsWith("namaste") || lower.startsWith("namaskar") || lower === "anya" || lower === "sunoji") {
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "happy",
        response: "Namaste! Main Anya hoon. Aap kya madad chahte hain?",
        hindiSpoken: "नमस्ते! मैं अन्या हूँ। आप क्या मदद चाहते हैं?"
      };
    }

    // 14. SPECIFIC DEMO COMMANDS (Orders with "Sir")
    if (lower.includes("beauty") || lower.includes("makeup") || lower.includes("salon") || lower.includes("parlour") || lower.includes("spa") || lower.includes("bridal") || lower.includes("shadi")) {
      return { action: "SHOW_SALON_DEMO", payload: "", emotion: "happy", response: "Ji Sir, abhi beauty demo kholti hoon.", hindiSpoken: "जी सर, अभी ब्यूटी डेमो खोलती हूँ।" };
    }
    if (lower.includes("cloth") || lower.includes("fashion") || lower.includes("dress") || lower.includes("boutique") || lower.includes("saree") || lower.includes("jeans") || lower.includes("kapd")) {
      return { action: "SHOW_TUITION_DEMO", payload: "", emotion: "happy", response: "Okay Sir, clothes demo open kar rahi hoon.", hindiSpoken: "ओके सर, क्लोथ्स डेमो ओपन कर रही हूँ।" };
    }
    if (lower.includes("bakery") || lower.includes("cake") || lower.includes("pastry") || lower.includes("sweetcrust") || lower.includes("biscuit")) {
      return { action: "SHOW_BAKERY_DEMO", payload: "", emotion: "happy", response: "Sure Sir, bakery demo open kar rahi hoon.", hindiSpoken: "श्योर सर, बेकरी डेमो ओपन कर रही हूँ।" };
    }
    if (lower.includes("pizza") || lower.includes("restaurant") || lower.includes("cafe") || lower.includes("burger") || (lower.includes("food") && (lower.includes("demo") || lower.includes("kholo") || lower.includes("dikhao")))) {
      return { action: "SHOW_PIZZA_DEMO", payload: "", emotion: "happy", response: "Okay Sir, restaurant demo open kar rahi hoon.", hindiSpoken: "ओके सर, रेस्टोरेंट डेमो ओपन कर रही हूँ।" };
    }
    if (lower.includes("ecommerce") || lower.includes("mart") || lower.includes("online store") || lower.includes("shopping") || lower.includes("shop") || lower.includes("anx mart")) {
      return { action: "SHOW_BUSINESS_DEMO", payload: "", emotion: "happy", response: "Ji Sir, e-commerce demo open kar rahi hoon.", hindiSpoken: "जी सर, ई-कॉमर्स डेमो ओपन कर रही हूँ।" };
    }
    if (lower.includes("electronic") || lower.includes("mobile") || lower.includes("laptop") || lower.includes("gadget") || lower.includes("technova") || lower.includes("tv")) {
      return { action: "SHOW_ELECTRONICS_DEMO", payload: "", emotion: "happy", response: "Okay Sir, electronics demo open kar rahi hoon.", hindiSpoken: "ओके सर, इलेक्ट्रॉनिक्स डेमो ओपन कर रही हूँ।" };
    }

    // 15. GENERAL DEMO INQUIRY (User mentions demo without category -> Ask one of the 3 questions, do NOT auto-launch demo)
    if (lower.includes("demo dekhna") || lower.includes("demo dikhao") || lower.includes("demo kya hai") || lower.includes("demos") || lower.includes("kaunse demo") || lower === "demo") {
      const prompt = getRandomDemoPrompt();
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "happy",
        response: prompt.text,
        hindiSpoken: prompt.hindi
      };
    }

    // 16. CONTEXT-AWARE COMMANDS ("iska demo kholo", "ye wala kholo", "ye project dikhao")
    if (lower.includes("iska demo") || lower.includes("ye wala") || lower.includes("ye demo") || lower.includes("iska project") || lower.includes("pehla wala") || lower.includes("open this")) {
      const activeMemberId = (window as any).__ANX_ACTIVE_MEMBER_ID__;
      const activeCarouselItem = (window as any).__ANX_ACTIVE_CAROUSEL_ITEM__;
      if (activeMemberId === 1) {
        return { action: "SHOW_BUSINESS_DEMO", payload: "1", emotion: "happy", response: "Ji Sir, abhi demo open kar rahi hoon.", hindiSpoken: "जी सर, अभी डेमो ओपन कर रही हूँ।" };
      }
      if (activeMemberId === 2) {
        return { action: "SHOW_ELECTRONICS_DEMO", payload: "2", emotion: "happy", response: "Ji Sir, abhi demo open kar rahi hoon.", hindiSpoken: "जी सर, अभी डेमो ओपन कर रही हूँ।" };
      }
      if (activeCarouselItem) {
        if (activeCarouselItem.isBeautyDemo) return { action: "SHOW_SALON_DEMO", payload: "", emotion: "happy", response: "Ji Sir, abhi beauty demo kholti hoon.", hindiSpoken: "जी सर, अभी ब्यूटी डेमो खोलती हूँ।" };
        if (activeCarouselItem.isClothesDemo) return { action: "SHOW_TUITION_DEMO", payload: "", emotion: "happy", response: "Okay Sir, clothes demo open kar rahi hoon.", hindiSpoken: "ओके सर, क्लोथ्स डेमो ओपन कर रही हूँ।" };
        if (activeCarouselItem.isElectronicsDemo) return { action: "SHOW_ELECTRONICS_DEMO", payload: "", emotion: "happy", response: "Okay Sir, electronics demo open kar rahi hoon.", hindiSpoken: "ओके सर, इलेक्ट्रॉनिक्स डेमो open कर रही हूँ।" };
        if (activeCarouselItem.isBakeryDemo) return { action: "SHOW_BAKERY_DEMO", payload: "", emotion: "happy", response: "Sure Sir, bakery demo open kar rahi hoon.", hindiSpoken: "श्योर सर, बेकरी डेमो ओपन कर रही हूँ।" };
        if (activeCarouselItem.isEcommerceDemo) return { action: "SHOW_BUSINESS_DEMO", payload: "", emotion: "happy", response: "Ji Sir, e-commerce demo open kar rahi hoon.", hindiSpoken: "जी सर, ई-कॉमर्स डेमो ओपन कर रही हूँ।" };
        if (activeCarouselItem.isLiveDemo) return { action: "SHOW_PIZZA_DEMO", payload: "", emotion: "happy", response: "Okay Sir, restaurant demo open kar rahi hoon.", hindiSpoken: "ओके सर, रेस्टोरेंट डेमो ओपन कर रही हूँ।" };
      }
      const prompt = getRandomDemoPrompt();
      return { action: "REPLY_ONLY", payload: "", emotion: "happy", response: prompt.text, hindiSpoken: prompt.hindi };
    }

    // 17. WEBSITE NAVIGATION & SCROLLING COMMANDS (Commands with "Sir")
    if (lower.includes("home kholo") || lower.includes("home par") || lower.includes("home dikhao") || lower.includes("top par") || lower.includes("main page") || lower === "home") {
      return { action: "OPEN_HOME", payload: "", emotion: "happy", response: "Ji Sir, home page par le ja rahi hoon.", hindiSpoken: "जी सर, होम पेज पर ले जा रही हूँ।" };
    }
    if (lower.includes("about dikhao") || lower.includes("about kholo") || lower.includes("about par") || lower.includes("about section") || lower === "about") {
      return { action: "OPEN_ABOUT", payload: "", emotion: "happy", response: "Okay Sir, about section open kar rahi hoon.", hindiSpoken: "ओके सर, अबाउट सेक्शन ओपन कर रही हूँ।" };
    }
    if (lower.includes("portfolio kholo") || lower.includes("portfolio dikhao") || lower.includes("portfolio par") || lower.includes("projects dikhao") || lower.includes("team dikhao") || lower.includes("members dikhao") || lower === "portfolio") {
      return { action: "OPEN_PORTFOLIO", payload: "", emotion: "happy", response: "Ji Sir, portfolio section open kar rahi hoon.", hindiSpoken: "जी सर, पोर्टफोलियो सेक्शन ओपन कर रही हूँ।" };
    }
    if (lower.includes("contact par") || lower.includes("contact kholo") || lower.includes("contact dikhao") || lower.includes("sampark") || lower === "contact") {
      return { action: "OPEN_CONTACT", payload: "", emotion: "happy", response: "Okay Sir, contact section par le chalte hain.", hindiSpoken: "ओके सर, कांटेक्ट सेक्शन पर ले चलते हैं।" };
    }
    if (lower.includes("demo sites dikhao") || lower.includes("demo sites kholo") || lower.includes("saare demos") || lower.includes("all demos") || lower.includes("demo sites")) {
      return { action: "OPEN_DEMO_SITES", payload: "", emotion: "happy", response: "Ji Sir, saare demo sites open kar rahi hoon.", hindiSpoken: "जी सर, सारे डेमो साइट्स ओपन कर रही हूँ।" };
    }
    if (lower.includes("services dikhao") || lower.includes("services kholo") || lower.includes("services section") || lower === "services") {
      return { action: "OPEN_SERVICES", payload: "", emotion: "happy", response: "Sure Sir, services section dikha rahi hoon.", hindiSpoken: "श्योर सर, सर्विसेज सेक्शन दिखा रही हूँ।" };
    }
    if (lower.includes("neeche scroll") || lower.includes("niche scroll") || lower.includes("scroll down") || lower.includes("niche jao") || lower.includes("neeche karo") || lower.includes("thoda niche")) {
      return { action: "SCROLL_DOWN", payload: "", emotion: "happy", response: "Sure Sir, scroll kar rahi hoon.", hindiSpoken: "श्योर सर, स्क्रॉल कर रही हूँ।" };
    }
    if (lower.includes("upar scroll") || lower.includes("scroll up") || lower.includes("upar jao") || lower.includes("upar karo") || lower.includes("thoda upar")) {
      return { action: "SCROLL_UP", payload: "", emotion: "happy", response: "Sure Sir, upar scroll kar rahi hoon.", hindiSpoken: "श्योर सर, ऊपर स्क्रॉल कर रही हूँ।" };
    }
    if (lower.includes("wapas jao") || lower.includes("back jao") || lower.includes("go back") || lower.includes("back to agency") || lower.includes("peeche jao") || lower.includes("exit demo") || lower.includes("close demo")) {
      return { action: "RETURN_TO_ANX", payload: "", emotion: "happy", response: "Sure Sir, back to agency chalte hain.", hindiSpoken: "श्योर सर, बैक टू एजेंसी चलते हैं।" };
    }

    // 18. CONTACT / WHATSAPP / CALL COMMANDS (Orders with "Sir")
    if (lower.includes("whatsapp") || lower.includes("chat")) {
      return { action: "OPEN_WHATSAPP", payload: "", emotion: "happy", response: "Ji Sir, WhatsApp chat open kar rahi hoon.", hindiSpoken: "जी सर, व्हाट्सएप चैट ओपन कर रही हूँ।" };
    }
    if (lower.includes("call karo") || lower.includes("phone milao") || lower.includes("call now")) {
      return { action: "OPEN_CALL", payload: "", emotion: "happy", response: "Sure Sir, direct call connect kar rahi hoon.", hindiSpoken: "श्योर सर, डायरेक्ट कॉल कनेक्ट कर रही हूँ।" };
    }

    // 19. PRICING INQUIRIES
    if (lower.includes("price") || lower.includes("pricing") || lower.includes("cost") || lower.includes("kharcha") || lower.includes("budget") || lower.includes("rate") || lower.includes("charges")) {
      return {
        action: "REPLY_ONLY",
        payload: "",
        emotion: "happy",
        response: "Humare website packages bohot budget-friendly hain! Special quotation ke liye WhatsApp par connect kar sakte hain.",
        hindiSpoken: "हमारे वेबसाइट पैकेजेस बहुत बजट-फ्रेंडली हैं! स्पेशल कोटेशन के लिए व्हाट्सएप पर कनेक्ट कर सकते हैं।"
      };
    }

    // General help fallback question when request is unclear
    return {
      action: "REPLY_ONLY",
      payload: "",
      emotion: "neutral",
      response: "Aap kya madad chahte hain?",
      hindiSpoken: "आप क्या मदद चाहते हैं?"
    };
  };

  const startCooldown = useCallback(() => {
    isCooldownActiveRef.current = true;
    setIsCooldownActive(true);
    updateState('idle');
    updateEmotion('annoyed');

    if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
    if (selfInitiativeTimerRef.current) clearTimeout(selfInitiativeTimerRef.current);

    cooldownTimerRef.current = setTimeout(() => {
      isCooldownActiveRef.current = false;
      setIsCooldownActive(false);
      updateEmotion('neutral');
    }, 30000); // Exactly 30-second silent cooldown
  }, [updateEmotion, updateState]);

  const handleModerationViolation = useCallback(() => {
    // 1. Immediately abort any active speech/fetch
    if (abortControllerRef.current) abortControllerRef.current.abort();
    if (synthRef.current) {
      try {
        synthRef.current.cancel();
      } catch (e) {}
    }
    if (selfInitiativeTimerRef.current) clearTimeout(selfInitiativeTimerRef.current);
    if (emotionResetTimerRef.current) clearTimeout(emotionResetTimerRef.current);
    if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);

    isSpeakingRef.current = false;
    isProcessingRef.current = false;

    // 2. Clear input & do NOT display the offending prompt anywhere
    setTextInput("");
    setCurrentPrompt("");

    // 3. Controlled warning response (NEVER saved to conversational history)
    const warningText = "Shame on you. Please don't talk like that.";
    const warningHindi = "शेम ऑन यू। प्लीज डोंट टॉक लाइक दैट।";

    updateEmotion('annoyed');
    setCurrentResponse(warningText);

    // 4. Speak warning once, then start 30-second silent cooldown immediately after
    speak(
      warningText,
      () => {
        startCooldown();
      },
      warningHindi
    );
  }, [speak, startCooldown, updateEmotion]);

  // Self-initiated casual conversation check (Anya initiates after ~5s of silence with natural cooldown and variety)
  const scheduleSelfInitiative = useCallback(() => {
    if (isCooldownActiveRef.current) return;
    if (selfInitiativeTimerRef.current) clearTimeout(selfInitiativeTimerRef.current);

    selfInitiativeTimerRef.current = setTimeout(() => {
      if (isCooldownActiveRef.current) return;
      const now = Date.now();
      // Cooldown check (wait at least 35 seconds between proactive prompts to stay natural and never annoying)
      if (now - lastProactiveInteractionTimeRef.current < 35000) {
        return;
      }

      if (
        !isSpeakingRef.current &&
        !isProcessingRef.current &&
        stateRef.current !== 'listening' &&
        !document.hidden
      ) {
        lastProactiveInteractionTimeRef.current = now;
        const proactiveInteractions = [
          { text: "Aap itne chup kyun ho?", hindiSpoken: "आप इतने चुप क्यों हो?", emotion: "surprised" as MascotEmotion },
          { text: "Hmm… mujhe ignore kar rahe ho kya?", hindiSpoken: "हम्म… मुझे इग्नोर कर रहे हो क्या?", emotion: "annoyed" as MascotEmotion },
          { text: "Aaj kya plan hai aapka?", hindiSpoken: "आज क्या प्लान है आपका?", emotion: "happy" as MascotEmotion },
          { text: "Aapko kis demo ke baare mein jaanna hai?", hindiSpoken: "आपको किस डेमो के बारे में जानना है?", emotion: "happy" as MascotEmotion },
          { text: "Aap kaunsa demo dekhna chahenge?", hindiSpoken: "आप कौनसा डेमो देखना चाहेंगे?", emotion: "happy" as MascotEmotion },
          { text: "Waise aap kya soch rahe ho?", hindiSpoken: "वैसे आप क्या सोच रहे हो?", emotion: "neutral" as MascotEmotion },
          { text: "Kuch interesting batao na!", hindiSpoken: "कुछ इंटरेस्टिंग बताओ ना!", emotion: "happy" as MascotEmotion },
          { text: "Main ek chota sa joke sunau kya?", hindiSpoken: "मैं एक छोटा सा जोक सुनाऊँ क्या?", emotion: "laughing" as MascotEmotion }
        ];

        const item = proactiveInteractions[Math.floor(Math.random() * proactiveInteractions.length)];
        setCurrentResponse(item.text);
        updateEmotion(item.emotion);
        conversationHistoryRef.current.push({ role: 'model', text: item.text });
        speak(item.text, undefined, item.hindiSpoken);
      }
    }, 5500); // Trigger check around ~5.5 seconds of silence
  }, [speak, updateEmotion]);

  // Schedule self-initiative on startup
  useEffect(() => {
    scheduleSelfInitiative();
    return () => {
      if (selfInitiativeTimerRef.current) clearTimeout(selfInitiativeTimerRef.current);
      if (emotionResetTimerRef.current) clearTimeout(emotionResetTimerRef.current);
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
    };
  }, [scheduleSelfInitiative]);

  const processIntent = async (text: string) => {
    if (!text.trim()) return;

    // 1. If in 30s cooldown, completely ignore and remain silent
    if (isCooldownActiveRef.current) {
      return;
    }

    // 2. Pre-execution content moderation check
    const mod = checkContentModeration(text);
    if (mod.isInappropriate) {
      handleModerationViolation();
      return;
    }

    if (selfInitiativeTimerRef.current) clearTimeout(selfInitiativeTimerRef.current);
    if (emotionResetTimerRef.current) clearTimeout(emotionResetTimerRef.current);

    isProcessingRef.current = true;
    updateState('processing');
    setCurrentPrompt(text);
    setCurrentResponse("Thinking...");

    if (clearTimerRef.current) clearTimeout(clearTimerRef.current);

    const t = text.toLowerCase().trim();

    // Instant emotional cue handling
    if (t.includes("sorry") || t.includes("maaf") || t.includes("galti") || t.includes("mazak tha") || t.includes("gussa mat")) {
      updateEmotion('happy');
    } else if (t.includes("chup") || t.includes("annoying") || t.includes("pagal") || t.includes("faltu") || t.includes("bekar")) {
      updateEmotion('annoyed');
    } else if (t.includes("haha") || t.includes("joke") || t.includes("funny") || t.includes("lol")) {
      updateEmotion('laughing');
    } else if (t.includes("rona") || t.includes("cry") || t.includes("aansu") || t.includes("ro raha")) {
      updateEmotion('crying');
    } else if (t.includes("sad") || t.includes("dukhi") || t.includes("bura")) {
      updateEmotion('sad');
    } else if (t.includes("really") || t.includes("sach me") || t.includes("omg") || t.includes("shock")) {
      updateEmotion('surprised');
    } else if (t.includes("bore") || t.includes("boring")) {
      updateEmotion('bored');
    }

    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    try {
      const detectVisibleSection = () => {
        if ((window as any).__ANX_CURRENT_VIEW__ && (window as any).__ANX_CURRENT_VIEW__ !== "agency") {
          return (window as any).__ANX_CURRENT_VIEW__;
        }
        const sections = ["contact", "portfolio", "about", "services", "demo-sites-list", "demo-sites", "home"];
        for (const id of sections) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.6 && rect.bottom >= window.innerHeight * 0.2) {
              return id;
            }
          }
        }
        return window.scrollY < 300 ? "home" : "body";
      };

      const context = {
        url: window.location.href,
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash,
        title: document.title,
        currentView: (window as any).__ANX_CURRENT_VIEW__ || "agency",
        activeMemberId: (window as any).__ANX_ACTIVE_MEMBER_ID__ || null,
        activeCarouselItem: (window as any).__ANX_ACTIVE_CAROUSEL_ITEM__ || null,
        visibleSection: detectVisibleSection(),
      };

      const res = await fetch('/api/voice-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: text,
          history: conversationHistoryRef.current.slice(-8),
          context
        }),
        signal: abortControllerRef.current.signal,
      });

      let data: any = null;
      if (res.ok) {
        data = await res.json();
      }

      if (!data || !data.response) {
        data = getClientIntentFallback(text);
      }

      if (data.isInappropriate) {
        handleModerationViolation();
        return;
      }

      isProcessingRef.current = false;
      setCurrentResponse(data.response);

      // Save in-memory active session conversational continuity
      conversationHistoryRef.current.push({ role: 'user', text });
      conversationHistoryRef.current.push({ role: 'model', text: data.response });
      if (conversationHistoryRef.current.length > 12) {
        conversationHistoryRef.current = conversationHistoryRef.current.slice(-12);
      }

      // Update Emotion
      if (data.emotion) {
        updateEmotion(data.emotion as MascotEmotion);
      }

      if (data.action && data.action !== 'REPLY_ONLY') {
        updateState('success');
        onAction(data.action, data.payload || "");
      } else if (data.response && (data.response.includes("samajh") || data.response.includes("pooch"))) {
        updateState('confused');
      }
      
      speak(data.response, () => {
        scheduleSelfInitiative();
        // Natural emotional cooldown: settle exaggerated expressions into gentle neutral
        if (data.emotion === 'surprised' || data.emotion === 'laughing' || data.emotion === 'crying') {
          emotionResetTimerRef.current = setTimeout(() => {
            if (emotionRef.current === data.emotion) {
              updateEmotion('neutral');
            }
          }, 3500);
        }
      }, data.hindiSpoken);
    } catch (error: any) {
      if (error.name === 'AbortError') return;
      isProcessingRef.current = false;
      const fallback = getClientIntentFallback(text);
      if (fallback.isInappropriate) {
        handleModerationViolation();
        return;
      }
      setCurrentResponse(fallback.response);

      conversationHistoryRef.current.push({ role: 'user', text });
      conversationHistoryRef.current.push({ role: 'model', text: fallback.response });
      if (fallback.emotion) {
        updateEmotion(fallback.emotion as MascotEmotion);
      }

      if (fallback.action && fallback.action !== 'REPLY_ONLY') {
        updateState('success');
        onAction(fallback.action, fallback.payload || "");
      }
      speak(fallback.response, () => {
        scheduleSelfInitiative();
      }, fallback.hindiSpoken);
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    if (isCooldownActiveRef.current) {
      setTextInput("");
      return;
    }

    // Immediately unlock and resume SpeechSynthesis on user gesture (Enter key / form submit)
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      } catch (e) {}
    }

    const query = textInput.trim();
    setTextInput("");

    const mod = checkContentModeration(query);
    if (mod.isInappropriate) {
      handleModerationViolation();
      return;
    }

    processIntent(query);
  };

  const handleQuickQuery = (query: string) => {
    if (isCooldownActiveRef.current) {
      setTextInput("");
      return;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      } catch (e) {}
    }
    setTextInput("");

    const mod = checkContentModeration(query);
    if (mod.isInappropriate) {
      handleModerationViolation();
      return;
    }

    processIntent(query);
  };

  return (
    <>
      <MascotCharacter
        state={state}
        emotion={emotion}
        isChatOpen={isChatOpen}
        onToggleChat={() => {
          setIsChatOpen(!isChatOpen);
        }}
        currentPrompt={currentPrompt}
        currentResponse={currentResponse}
        onCloseResponse={() => setCurrentResponse("")}
        textInput={textInput}
        setTextInput={setTextInput}
        onTextSubmit={handleTextSubmit}
        onQuickQuery={handleQuickQuery}
        selectedAgent={selectedAgent}
        onOpenAgentSelector={() => setIsAgentSelectorOpen(true)}
        isCooldownActive={isCooldownActive}
      />

      <AgentSelectorModal
        isOpen={isAgentSelectorOpen}
        onClose={() => setIsAgentSelectorOpen(false)}
        selectedAgentId={selectedAgent.id}
        onSelectAgent={(agent) => {
          setSelectedAgent(agent);
          setCurrentResponse(agent.welcomeMessage);
          speak(agent.welcomeMessage);
        }}
      />
    </>
  );
}
