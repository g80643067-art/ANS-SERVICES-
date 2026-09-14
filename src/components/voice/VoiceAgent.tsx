import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { MascotCharacter, MascotState } from './MascotCharacter';
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

  // Safe client-side fallback if server API is slow or unreachable
  const getClientIntentFallback = (queryText: string) => {
    const lower = queryText.toLowerCase();
    if (lower.includes("beauty") || lower.includes("makeup") || lower.includes("salon") || lower.includes("parlour") || lower.includes("bridal") || lower.includes("spa")) {
      return { action: "SHOW_SALON_DEMO", payload: "", response: "Yeh lijiye, hamara luxury salon aur beauty parlour website ka demo." };
    }
    if (lower.includes("cloth") || lower.includes("fashion") || lower.includes("dress") || lower.includes("boutique") || lower.includes("saree") || lower.includes("jeans")) {
      return { action: "SHOW_TUITION_DEMO", payload: "", response: "Zaroor, yeh raha hamara modern fashion aur clothing boutique ka demo." };
    }
    if (lower.includes("bakery") || lower.includes("cake") || lower.includes("pastry") || lower.includes("sweet")) {
      return { action: "SHOW_BAKERY_DEMO", payload: "", response: "Bilkul! Bakery aur cake store ka live demo aapke saamne hai." };
    }
    if (lower.includes("food") || lower.includes("pizza") || lower.includes("restaurant") || lower.includes("cafe") || lower.includes("khana") || lower.includes("burger")) {
      return { action: "SHOW_PIZZA_DEMO", payload: "", response: "Bilkul, main aapko hamari restaurant aur food ordering website ka live demo dikhata hoon." };
    }
    if (lower.includes("ecommerce") || lower.includes("shop") || lower.includes("mart") || lower.includes("store") || lower.includes("product")) {
      return { action: "SHOW_BUSINESS_DEMO", payload: "", response: "Main aapko hamare modern e-commerce platform ka demo dikhata hoon." };
    }
    if (lower.includes("electronic") || lower.includes("mobile") || lower.includes("gadget") || lower.includes("laptop") || lower.includes("tv")) {
      return { action: "SHOW_ELECTRONICS_DEMO", payload: "", response: "Electronics store ka demo open kar raha hoon." };
    }
    if (lower.includes("price") || lower.includes("pricing") || lower.includes("cost") || lower.includes("budget") || lower.includes("kharcha") || lower.includes("rate")) {
      return { action: "OPEN_WHATSAPP", payload: "", response: "Humare website packages bohot budget-friendly hain! WhatsApp par connect ho kar quotation le sakte hain." };
    }
    if (lower.includes("contact") || lower.includes("whatsapp") || lower.includes("call") || lower.includes("baat") || lower.includes("phone")) {
      return { action: "OPEN_CONTACT", payload: "", response: "Aap niche diye gaye contact form ya direct WhatsApp ke zariye humse connect kar sakte hain." };
    }
    if (lower.includes("service") || lower.includes("kaam") || lower.includes("kya banate")) {
      return { action: "OPEN_SERVICES", payload: "", response: "Hum custom websites, web applications, e-commerce aur high-speed landing pages banate hain." };
    }
    if (lower.includes("portfolio") || lower.includes("projects") || lower.includes("past work")) {
      return { action: "OPEN_PORTFOLIO", payload: "", response: "Yeh rahe hamare portfolio aur members ke projects." };
    }
    if (lower.includes("about") || lower.includes("agency") || lower.includes("bare me")) {
      return { action: "OPEN_ABOUT", payload: "", response: "ANX Agency ek modern digital product aur high-converting website agency hai." };
    }
    if (lower.includes("home") || lower.includes("top") || lower.includes("back") || lower.includes("wapas")) {
      return { action: "RETURN_TO_ANX", payload: "", response: "Theek hai, main aapko wapas ANX home screen par le chalti hoon." };
    }
    return { action: "REPLY_ONLY", payload: "", response: "Main ANX Agency AI assistant hoon. Aap mujhse salon, food, bakery, clothes ya electronics demo dekhne keh sakte hain!" };
  };

  const processIntent = async (text: string) => {
    if (!text.trim()) return;
    isProcessingRef.current = true;
    updateState('processing');
    setCurrentPrompt(text);
    setCurrentResponse("Thinking...");

    if (clearTimerRef.current) clearTimeout(clearTimerRef.current);

    const t = text.toLowerCase();
    if (t.includes("khana kha lo") || t.includes("kuch kha lo") || t.includes("food kha lo")) updateState('eating');
    else if (t.includes("achha") || t.includes("nice") || t.includes("cute") || t.includes("well done") || t.includes("good")) updateState('happy');
    else if (t.includes("pareshan") || t.includes("annoying") || t.includes("tease")) updateState('angry');
    else if (t.includes("bhook")) updateState('hungry');

    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    try {
      const context = {
        url: window.location.href,
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash,
        title: document.title,
        activeMemberId: (window as any).__ANX_ACTIVE_MEMBER_ID__ || null
      };

      const res = await fetch('/api/voice-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: text, history: [], context }),
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
      if (data.action && data.action !== 'REPLY_ONLY') {
        updateState('success');
        onAction(data.action, data.payload || "");
      } else if (data.response && (data.response.includes("samajh") || data.response.includes("pooch"))) {
        updateState('confused');
      }
      
      speak(data.response);
    } catch (error: any) {
      if (error.name === 'AbortError') return;
      isProcessingRef.current = false;
      const fallback = getClientIntentFallback(text);
      setCurrentResponse(fallback.response);
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
