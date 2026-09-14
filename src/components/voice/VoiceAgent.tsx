import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { MascotCharacter, MascotState, MascotEmotion } from './MascotCharacter';
import { AgentSelectorModal, AGENT_OPTIONS, AgentOption } from './AgentSelectorModal';

interface VoiceAgentProps {
  onAction: (action: string, payload: string) => void;
}

const getAgentVoice = (voices: SpeechSynthesisVoice[], agentId: string): SpeechSynthesisVoice | undefined => {
  if (!voices || voices.length === 0) return undefined;

  const isFemale = agentId === "anya" || agentId === "maya";

  // 1. Regional Indian voices (Hindi or Indian English)
  const indianVoices = voices.filter(
    (v) => v.lang.toLowerCase().includes("hi") || v.lang.toLowerCase().includes("in")
  );

  if (indianVoices.length > 0) {
    if (isFemale) {
      const female = indianVoices.find(
        (v) =>
          v.name.toLowerCase().includes("female") ||
          v.name.toLowerCase().includes("swara") ||
          v.name.toLowerCase().includes("heera") ||
          v.name.toLowerCase().includes("kalpana") ||
          v.name.toLowerCase().includes("priya") ||
          v.name.toLowerCase().includes("lekha") ||
          v.name.toLowerCase().includes("google")
      );
      if (female) return female;
    } else {
      const male = indianVoices.find(
        (v) =>
          v.name.toLowerCase().includes("male") ||
          v.name.toLowerCase().includes("rishi") ||
          v.name.toLowerCase().includes("madhav") ||
          v.name.toLowerCase().includes("ravi")
      );
      if (male) return male;
    }
    return indianVoices[0];
  }

  // 2. High-quality natural English voices matching persona gender
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
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [state, setState] = useState<MascotState>('idle');
  const [emotion, setEmotion] = useState<MascotEmotion>('neutral');
  const emotionRef = useRef<MascotEmotion>('neutral');
  const [liveTranscript, setLiveTranscript] = useState("");
  const [isMicMuted, setIsMicMutedState] = useState(false);
  const isMicMutedRef = useRef(false);

  const setIsMicMuted = (muted: boolean) => {
    isMicMutedRef.current = muted;
    setIsMicMutedState(muted);
  };

  const [currentPrompt, setCurrentPrompt] = useState("");
  const [currentResponse, setCurrentResponse] = useState("Namaste! Main ANX Agency AI assistant hoon. Main aapke liye best website demo dikha sakti hoon!");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<AgentOption>(AGENT_OPTIONS[0]);
  const [isAgentSelectorOpen, setIsAgentSelectorOpen] = useState(false);
  const clearTimerRef = useRef<NodeJS.Timeout | null>(null);
  const speakTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // In-memory conversational history for the active session (not stored in persistent storage or visible logs)
  const conversationHistoryRef = useRef<Array<{ role: 'user' | 'model'; text: string }>>([]);
  const hasInitiatedSelfQuestionRef = useRef<boolean>(false);
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
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  
  const speechBufferRef = useRef<string>("");
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const restartTimerRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const currentAiUtteranceTextRef = useRef<string>("");
  const speechStartTimeRef = useRef<number>(0);
  const isSpeakingRef = useRef<boolean>(false);
  const isProcessingRef = useRef<boolean>(false);
  const lastProcessedTextRef = useRef<string>("");
  const lastProcessedTimeRef = useRef<number>(0);
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
        speak("Welcome to ANX Agency! Main aapki AI assistant hoon. Main aapki kya madad kar sakti hoon?");
      }
    }, 1200);

    return () => {
      clearTimeout(welcomeTimer);
      clearInterval(speechHeartbeat);
      window.removeEventListener('click', handleUnlockAudio);
      window.removeEventListener('keydown', handleUnlockAudio);
      window.removeEventListener('touchstart', handleUnlockAudio);
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
      if (speakTimeoutRef.current) clearTimeout(speakTimeoutRef.current);
      if (synthRef.current) {
        try { synthRef.current.cancel(); } catch (e) {}
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.onend = null;
          recognitionRef.current.onerror = null;
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  const requestPermissionAndStart = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
      }
      setPermissionGranted(true);
      if (!isMicMutedRef.current) {
        startListening();
      }
    } catch (err) {
      console.warn("Microphone access notice:", err);
      setPermissionGranted(false);
      setIsMicMuted(true);
      updateState('idle');
    }
  };

  const isEchoOfAiSpeech = (heardText: string): boolean => {
    if (!currentAiUtteranceTextRef.current) return false;
    const cleanHeard = heardText.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
    const cleanAi = currentAiUtteranceTextRef.current.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
    
    if (!cleanHeard || !cleanAi) return false;

    const minLen = Math.min(cleanHeard.length, cleanAi.length);
    let matchCount = 0;
    for(let i = 0; i < minLen; i++) {
        if(cleanHeard[i] === cleanAi[i]) matchCount++;
    }
    
    return (matchCount / Math.max(cleanHeard.length, cleanAi.length)) > 0.8;
  };

  const commitSpeech = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    const candidate = speechBufferRef.current.trim();
    speechBufferRef.current = "";
    setLiveTranscript("");

    if (!candidate || candidate.length < 2) return;

    const now = Date.now();
    if (candidate === lastProcessedTextRef.current && now - lastProcessedTimeRef.current < 2500) return;
    if (isEchoOfAiSpeech(candidate)) return;

    lastProcessedTextRef.current = candidate;
    lastProcessedTimeRef.current = now;

    processIntent(candidate);
  }, []);

  const initSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return null;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'hi-IN';

    recognition.onstart = () => {
      if (!isSpeakingRef.current && !isProcessingRef.current) updateState('listening');
    };

    recognition.onresult = (event: any) => {
      let currentSessionFinal = "";
      let currentSessionInterim = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const item = event.results[i];
        if (item.isFinal) {
          currentSessionFinal += item[0].transcript + " ";
        } else {
          currentSessionInterim += item[0].transcript;
        }
      }

      const activeSpeech = (currentSessionFinal + currentSessionInterim).trim();
      if (!activeSpeech) return;

      if (isSpeakingRef.current) {
        const timeSinceSpeechStart = Date.now() - speechStartTimeRef.current;
        if (timeSinceSpeechStart > 300 && !isEchoOfAiSpeech(activeSpeech)) {
          if (synthRef.current) synthRef.current.cancel();
          isSpeakingRef.current = false;
          currentAiUtteranceTextRef.current = "";
          updateState('listening');
          speechBufferRef.current = activeSpeech;
          setLiveTranscript(activeSpeech);
        }
      } else {
        if (currentSessionFinal) {
          speechBufferRef.current = (speechBufferRef.current + " " + currentSessionFinal).replace(/\s+/g, " ").trim();
        } else if (currentSessionInterim) {
          const fullDraft = (speechBufferRef.current + " " + currentSessionInterim).replace(/\s+/g, " ").trim();
          setLiveTranscript(fullDraft);
        }

        const combinedText = (speechBufferRef.current + " " + currentSessionInterim).trim();
        setLiveTranscript(combinedText);

        if (stateRef.current !== 'listening' && !isProcessingRef.current) updateState('listening');

        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        const waitMs = currentSessionFinal ? 600 : 1100;
        if (combinedText.length >= 2) {
          silenceTimerRef.current = setTimeout(() => {
            if (speechBufferRef.current.trim() || currentSessionInterim.trim()) {
              if (currentSessionInterim.trim()) speechBufferRef.current = (speechBufferRef.current + " " + currentSessionInterim).trim();
              commitSpeech();
            }
          }, waitMs);
        }
      }
    };

    recognition.onerror = (event: any) => {
      const benignErrors = ['no-speech', 'audio-capture', 'network', 'aborted', 'interrupted'];
      if (benignErrors.includes(event.error)) return;
      console.warn("Speech recognition notice:", event.error);
    };

    recognition.onend = () => {
      if (!isMicMutedRef.current && !isProcessingRef.current) {
        if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
        restartTimerRef.current = setTimeout(() => {
          if (!isMicMutedRef.current && !isProcessingRef.current) startListening();
        }, 300);
      }
    };

    return recognition;
  };

  const startListening = () => {
    if (isMicMutedRef.current) return;
    if (!recognitionRef.current) recognitionRef.current = initSpeechRecognition();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        if (!isSpeakingRef.current && !isProcessingRef.current) updateState('listening');
      } catch (e) {}
    }
  };

  const stopListening = () => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
    updateState('idle');
  };

  const speak = (text: string, onEndCallback?: () => void) => {
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

    // Stop speech recognition while speaking so AI does not hear itself
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.stop();
      } catch (e) {}
    }

    // Cancel any previous active speech cleanly
    try {
      if (synth.speaking || synth.pending) {
        synth.cancel();
      }
    } catch (e) {}

    currentAiUtteranceTextRef.current = text;

    const finishSpeaking = () => {
      if (speakTimeoutRef.current) {
        clearTimeout(speakTimeoutRef.current);
        speakTimeoutRef.current = null;
      }
      isSpeakingRef.current = false;
      currentAiUtteranceTextRef.current = "";
      utteranceRef.current = null;
      (window as any).__activeUtterance = null;

      if (!isMicMutedRef.current && permissionGranted) {
        updateState('listening');
        startListening();
      } else {
        updateState('idle');
      }
      if (onEndCallback) onEndCallback();
    };

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    (window as any).__activeUtterance = utterance; // Prevent garbage collection bug in Chrome

    // Agent persona voice selection & audio tuning
    try {
      const voices = synth.getVoices() || [];
      const selectedVoice = getAgentVoice(voices, selectedAgent.id);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    } catch (e) {}

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
      utterance.pitch = 1.06;
      utterance.rate = 1.02;
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

  const ACKNOWLEDGMENTS = [
    "OK boss!",
    "Sure boss!",
    "Done boss!",
    "On it boss!",
    "Got it boss!",
    "Yes boss!"
  ];

  const getRandomAck = () => ACKNOWLEDGMENTS[Math.floor(Math.random() * ACKNOWLEDGMENTS.length)];

  // Safe client-side fallback if server API is slow or unreachable
  const getClientIntentFallback = (queryText: string) => {
    const lower = queryText.toLowerCase().trim();

    // 1. PRAISE & COMPLIMENTS (Happy)
    if (lower.includes("cute") || lower.includes("sundar") || lower.includes("smart") || lower.includes("achhi ho") || lower.includes("achhe ho") || lower.includes("best") || lower.includes("shabash") || lower.includes("good job") || lower.includes("great") || lower.includes("love you") || lower.includes("badhiya")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "happy", response: "Aww thank you boss! Aap bhi bohot ache ho! Waise aaj kya plan hai?" };
    }

    // 2. JOKES & LAUGHTER (Laughing)
    if (lower.includes("haha") || lower.includes("hehe") || lower.includes("lol") || lower.includes("joke") || lower.includes("chutkula") || lower.includes("funny")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "laughing", response: "Hahaha, yeh sach me bohot funny tha! Ek aur sunao na?" };
    }

    // 3. APOLOGY (Forgiving -> Happy)
    if (lower.includes("sorry") || lower.includes("maaf") || lower.includes("galti") || lower.includes("mazak tha") || lower.includes("gussa mat")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "happy", response: "Chalo koi baat nahi, ab dosti pakki! Batao aage kya karein?" };
    }

    // 4. TEASING / MILD ANNOYANCE (Annoyed - Glowing red eyes)
    if (lower.includes("bekar") || lower.includes("pagal") || lower.includes("chup") || lower.includes("annoying") || lower.includes("faltu") || lower.includes("bore mat kar") || lower.includes("hate") || lower.includes("gandi")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "annoyed", response: "Hmph! Aise bologe ab? Main itne pyaar se help kar rahi hoon!" };
    }

    // 5. DEEP SADNESS / CRYING (Crying)
    if (lower.includes("ro raha") || lower.includes("rona aa raha") || lower.includes("cry") || lower.includes("aansu") || lower.includes("dard") || lower.includes("dil toot")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "crying", response: "Oh no, please udaas mat ho! Main hamesha aapke sath hoon na." };
    }

    // 6. SADNESS / GLOOMY (Sad)
    if (lower.includes("sad") || lower.includes("mood kharab") || lower.includes("dukhi") || lower.includes("bura lag raha") || lower.includes("pareshan")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "sad", response: "Arey kya hua boss? Sab theek toh hai na? Main mood fresh karne ke liye koi demo dikhaun?" };
    }

    // 7. SURPRISED (Surprised)
    if (lower.includes("sach me") || lower.includes("really") || lower.includes("wait what") || lower.includes("shock") || lower.includes("omg") || lower.includes("kya baat")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "surprised", response: "Really?! Sach me aisa hua? Phir aage kya hua?" };
    }

    // 8. BOREDOM (Bored)
    if (lower.includes("bore") || lower.includes("kuch nahi") || lower.includes("kya karu") || lower.includes("timepass")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "bored", response: "Bore ho rahe ho? Chalo hamare stylish electronics ya pizza ordering demo explore karte hain!" };
    }

    // 9. FOOD & HUNGER (Follow-up cross question)
    if (lower.includes("bhook") || lower.includes("hungry") || lower.includes("khana") || lower.includes("lunch") || lower.includes("dinner") || lower.includes("khane")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "happy", response: "Achha bhook lagi hai! Aaj kya khane ka mann hai, spicy pizza ya kuch meetha dessert?" };
    }

    // 10. CASUAL CONVERSATIONS & CHECK-INS
    if (lower.includes("kaise ho") || lower.includes("how are you") || lower.includes("kya haal")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "happy", response: "Main bilkul mast aur ready hoon boss! Aap batao, aaj ka din kaisa raha?" };
    }
    if (lower.includes("kya kar sakti") || lower.includes("kya kar sakte") || lower.includes("what can you do") || lower.includes("kya kaam hai")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "happy", response: "Main aapki friendly companion hoon boss! Aapse baatein kar sakti hoon, live demos dikha sakti hoon, aur website navigate kar sakti hoon." };
    }
    if (lower.includes("aaj kya kar rahe") || lower.includes("kya kar rahe ho") || lower.includes("what are you doing") || lower.includes("kya chal raha")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "happy", response: "Bas boss, aapke sath chill kar rahi hoon! Waise aap aaj kya plan kar rahe ho?" };
    }
    if (lower.includes("kaun ho tum") || lower.includes("who are you") || lower.includes("apna naam") || lower.includes("tumhara naam")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "happy", response: "Main aapki virtual companion aur ANX Agency guide hoon boss!" };
    }
    if (lower.includes("anx kya hai") || lower.includes("agency kya") || lower.includes("anx ke bare me")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "happy", response: "ANX Agency high-performance modern websites aur custom e-commerce platforms banati hai boss!" };
    }
    if (lower.startsWith("hello") || lower.startsWith("hi") || lower.startsWith("hey") || lower.startsWith("namaste") || lower.startsWith("namaskar")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "happy", response: "Namaste boss! Kahiye, aaj kaun sa naya website demo explore karein?" };
    }

    // 11. CONTEXT-AWARE COMMANDS ("iska demo kholo", "ye wala kholo", "ye project dikhao")
    if (lower.includes("iska demo") || lower.includes("ye wala") || lower.includes("ye demo") || lower.includes("iska project") || lower.includes("pehla wala") || lower.includes("open this")) {
      const activeMemberId = (window as any).__ANX_ACTIVE_MEMBER_ID__;
      const activeCarouselItem = (window as any).__ANX_ACTIVE_CAROUSEL_ITEM__;
      if (activeMemberId === 1) {
        return { action: "SHOW_BUSINESS_DEMO", payload: "1", emotion: "happy", response: getRandomAck() };
      }
      if (activeMemberId === 2) {
        return { action: "SHOW_ELECTRONICS_DEMO", payload: "2", emotion: "happy", response: getRandomAck() };
      }
      if (activeCarouselItem) {
        if (activeCarouselItem.isBeautyDemo) return { action: "SHOW_SALON_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
        if (activeCarouselItem.isClothesDemo) return { action: "SHOW_TUITION_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
        if (activeCarouselItem.isElectronicsDemo) return { action: "SHOW_ELECTRONICS_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
        if (activeCarouselItem.isBakeryDemo) return { action: "SHOW_BAKERY_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
        if (activeCarouselItem.isEcommerceDemo) return { action: "SHOW_BUSINESS_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
        if (activeCarouselItem.isLiveDemo) return { action: "SHOW_PIZZA_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
      }
      return { action: "OPEN_DEMO_SITES", payload: "", emotion: "happy", response: getRandomAck() };
    }

    // 12. SPECIFIC DEMO COMMANDS
    if (lower.includes("beauty") || lower.includes("makeup") || lower.includes("salon") || lower.includes("parlour") || lower.includes("spa") || lower.includes("bridal") || lower.includes("shadi")) {
      return { action: "SHOW_SALON_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("cloth") || lower.includes("fashion") || lower.includes("dress") || lower.includes("boutique") || lower.includes("saree") || lower.includes("jeans") || lower.includes("kapd")) {
      return { action: "SHOW_TUITION_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("bakery") || lower.includes("cake") || lower.includes("pastry") || lower.includes("sweetcrust") || lower.includes("biscuit")) {
      return { action: "SHOW_BAKERY_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("pizza") || lower.includes("food") || lower.includes("restaurant") || lower.includes("khana") || lower.includes("cafe") || lower.includes("burger")) {
      return { action: "SHOW_PIZZA_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("ecommerce") || lower.includes("mart") || lower.includes("online store") || lower.includes("shopping") || lower.includes("shop") || lower.includes("anx mart")) {
      return { action: "SHOW_BUSINESS_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("electronic") || lower.includes("mobile") || lower.includes("laptop") || lower.includes("gadget") || lower.includes("technova") || lower.includes("tv")) {
      return { action: "SHOW_ELECTRONICS_DEMO", payload: "", emotion: "happy", response: getRandomAck() };
    }

    // 13. WEBSITE NAVIGATION & SCROLLING COMMANDS
    if (lower.includes("home kholo") || lower.includes("home par") || lower.includes("home dikhao") || lower.includes("top par") || lower.includes("main page") || lower === "home") {
      return { action: "OPEN_HOME", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("about dikhao") || lower.includes("about kholo") || lower.includes("about par") || lower.includes("about section") || lower === "about") {
      return { action: "OPEN_ABOUT", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("portfolio kholo") || lower.includes("portfolio dikhao") || lower.includes("portfolio par") || lower.includes("projects dikhao") || lower.includes("team dikhao") || lower.includes("members dikhao") || lower === "portfolio") {
      return { action: "OPEN_PORTFOLIO", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("contact par") || lower.includes("contact kholo") || lower.includes("contact dikhao") || lower.includes("sampark") || lower === "contact") {
      return { action: "OPEN_CONTACT", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("demo sites dikhao") || lower.includes("demo sites kholo") || lower.includes("saare demos") || lower.includes("all demos") || lower.includes("demo sites") || lower.includes("demos dikhao") || lower === "demo") {
      return { action: "OPEN_DEMO_SITES", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("services dikhao") || lower.includes("services kholo") || lower.includes("services section") || lower === "services") {
      return { action: "OPEN_SERVICES", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("neeche scroll") || lower.includes("niche scroll") || lower.includes("scroll down") || lower.includes("niche jao") || lower.includes("neeche karo") || lower.includes("thoda niche")) {
      return { action: "SCROLL_DOWN", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("upar scroll") || lower.includes("scroll up") || lower.includes("upar jao") || lower.includes("upar karo") || lower.includes("thoda upar")) {
      return { action: "SCROLL_UP", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("wapas jao") || lower.includes("back jao") || lower.includes("go back") || lower.includes("back to agency") || lower.includes("peeche jao") || lower.includes("exit demo") || lower.includes("close demo")) {
      return { action: "RETURN_TO_ANX", payload: "", emotion: "happy", response: getRandomAck() };
    }

    // 14. CONTACT / WHATSAPP / CALL COMMANDS
    if (lower.includes("whatsapp") || lower.includes("chat")) {
      return { action: "OPEN_WHATSAPP", payload: "", emotion: "happy", response: getRandomAck() };
    }
    if (lower.includes("call karo") || lower.includes("phone milao") || lower.includes("call now")) {
      return { action: "OPEN_CALL", payload: "", emotion: "happy", response: getRandomAck() };
    }

    // 15. PRICING INQUIRIES
    if (lower.includes("price") || lower.includes("pricing") || lower.includes("cost") || lower.includes("kharcha") || lower.includes("budget") || lower.includes("rate") || lower.includes("charges")) {
      return { action: "REPLY_ONLY", payload: "", emotion: "happy", response: "Humare website packages bohot budget-friendly hain boss! Special quotation ke liye WhatsApp par connect kar sakte hain." };
    }

    // Default friendly response
    return { action: "REPLY_ONLY", payload: "", emotion: "neutral", response: "Main aapki virtual companion hoon boss! Bataiye, aaj kya exciting explore karein?" };
  };

  // Self-initiated casual conversation check (asks once if user is silent, stays silent if ignored)
  const scheduleSelfInitiative = useCallback(() => {
    if (selfInitiativeTimerRef.current) clearTimeout(selfInitiativeTimerRef.current);
    if (hasInitiatedSelfQuestionRef.current) return;

    selfInitiativeTimerRef.current = setTimeout(() => {
      if (
        !isSpeakingRef.current &&
        !isProcessingRef.current &&
        !hasInitiatedSelfQuestionRef.current &&
        stateRef.current !== 'listening'
      ) {
        hasInitiatedSelfQuestionRef.current = true; // Mark as initiated; won't spam if ignored
        const proactiveQuestions = [
          "Boss, kya main aapko hamari popular website designs dikhaun?",
          "Aapka business kis type ka hai boss? Main us hisaab se best demo suggest karungi.",
          "Aaj koi naya project plan kar rahe ho boss?"
        ];
        const q = proactiveQuestions[Math.floor(Math.random() * proactiveQuestions.length)];
        setCurrentResponse(q);
        updateEmotion("happy");
        conversationHistoryRef.current.push({ role: 'model', text: q });
        speak(q);
      }
    }, 25000); // 25 seconds of idle time
  }, [speak, updateEmotion]);

  // Schedule self-initiative on startup
  useEffect(() => {
    scheduleSelfInitiative();
    return () => {
      if (selfInitiativeTimerRef.current) clearTimeout(selfInitiativeTimerRef.current);
      if (emotionResetTimerRef.current) clearTimeout(emotionResetTimerRef.current);
    };
  }, [scheduleSelfInitiative]);

  const processIntent = async (text: string) => {
    if (!text.trim()) return;

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
        // Natural emotional cooldown: settle exaggerated expressions into gentle neutral
        if (data.emotion === 'surprised' || data.emotion === 'laughing' || data.emotion === 'crying') {
          emotionResetTimerRef.current = setTimeout(() => {
            if (emotionRef.current === data.emotion) {
              updateEmotion('neutral');
            }
          }, 3500);
        }
      });
    } catch (error: any) {
      if (error.name === 'AbortError') return;
      isProcessingRef.current = false;
      const fallback = getClientIntentFallback(text);
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
      speak(fallback.response);
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;

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
    setLiveTranscript("");
    processIntent(query);
  };

  const handleQuickQuery = (query: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      } catch (e) {}
    }
    setTextInput("");
    setLiveTranscript("");
    processIntent(query);
  };

  const handleToggleMic = () => {
    // Unlock SpeechSynthesis on click gesture
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      } catch (e) {}
    }

    if (state === 'listening' || state === 'processing' || state === 'speaking') {
      setIsMicMuted(true);
      stopListening();
      if (synthRef.current) {
        try { synthRef.current.cancel(); } catch (e) {}
      }
      updateState('idle');
    } else {
      setIsMicMuted(false);
      if (!permissionGranted) {
        requestPermissionAndStart();
      } else {
        startListening();
      }
    }
  };

  return (
    <>
      <MascotCharacter
        state={state}
        emotion={emotion}
        transcript={liveTranscript}
        isMuted={isMicMuted}
        onToggleMic={handleToggleMic}
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
