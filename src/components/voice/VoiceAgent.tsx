import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { MascotCharacter, MascotState } from './MascotCharacter';
import { AgentSelectorModal, AGENT_OPTIONS, AgentOption } from './AgentSelectorModal';

interface VoiceAgentProps {
  onAction: (action: string, payload: string) => void;
}

export function VoiceAgent({ onAction }: VoiceAgentProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [state, setState] = useState<MascotState>('idle');
  const [liveTranscript, setLiveTranscript] = useState("");
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [currentResponse, setCurrentResponse] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<AgentOption>(AGENT_OPTIONS[0]);
  const [isAgentSelectorOpen, setIsAgentSelectorOpen] = useState(false);
  const clearTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  const updateState = useCallback((newState: MascotState) => {
    stateRef.current = newState;
    setState(newState);
  }, []);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    const welcomeTimer = setTimeout(() => {
      if (!hasStarted && !isMicMuted) {
        setHasStarted(true);
        speak(
          "Welcome to ANX Agency! Main aapki AI assistant hoon. Main aapki kya madad kar sakti hoon?",
          () => {
            requestPermissionAndStart();
          }
        );
      }
    }, 1200);

    return () => {
      clearTimeout(welcomeTimer);
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
      if (synthRef.current) synthRef.current.cancel();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.onend = null;
          recognitionRef.current.onerror = null;
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, [hasStarted, isMicMuted]);

  const requestPermissionAndStart = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      setPermissionGranted(true);
      startListening();
    } catch (err) {
      console.warn("Microphone access not granted or not supported:", err);
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
        if (combinedText.length >= 2) {
          silenceTimerRef.current = setTimeout(() => {
            if (speechBufferRef.current.trim() || currentSessionInterim.trim()) {
              if (currentSessionInterim.trim()) speechBufferRef.current = (speechBufferRef.current + " " + currentSessionInterim).trim();
              commitSpeech();
            }
          }, 2500);
        }
      }
    };

    recognition.onerror = (event: any) => {
      const benignErrors = ['no-speech', 'audio-capture', 'network', 'aborted', 'interrupted'];
      if (benignErrors.includes(event.error)) return;
      console.warn("Speech recognition notice:", event.error);
    };

    recognition.onend = () => {
      if (!isMicMuted && !isProcessingRef.current) {
        if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
        restartTimerRef.current = setTimeout(() => {
          if (!isMicMuted && !isProcessingRef.current) startListening();
        }, 300);
      }
    };

    return recognition;
  };

  const startListening = () => {
    if (isMicMuted) return;
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
    if (!synthRef.current || isMicMuted || !text.trim()) return;
    synthRef.current.cancel();

    currentAiUtteranceTextRef.current = text;
    isSpeakingRef.current = true;
    speechStartTimeRef.current = Date.now();
    updateState('speaking');

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(
      (v) => (v.lang.includes('hi') || v.lang.includes('IN') || v.name.includes('India')) && (v.name.includes('Female') || true)
    );

    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.rate = 1.02;
    utterance.pitch = 1.08;

    utterance.onstart = () => {
      isSpeakingRef.current = true;
      speechStartTimeRef.current = Date.now();
      updateState('speaking');
    };

    utterance.onend = () => {
      isSpeakingRef.current = false;
      currentAiUtteranceTextRef.current = "";
      if (onEndCallback) onEndCallback();
      else if (!isMicMuted) { updateState('listening'); startListening(); } else updateState('idle');
    };

    utterance.onerror = () => {
      isSpeakingRef.current = false;
      currentAiUtteranceTextRef.current = "";
      if (!isMicMuted) { updateState('listening'); startListening(); }
    };

    synthRef.current.speak(utterance);
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
      // Create context info for the backend
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
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      isProcessingRef.current = false;
      setCurrentResponse(data.response);
      if (data.action && data.action !== 'REPLY_ONLY') {
        updateState('success');
        onAction(data.action, data.payload || "");
      } else if (data.response && (data.response.includes("samajh") || data.response.includes("pooch"))) updateState('confused');
      
      speak(data.response, () => {
        // After speech ends, let user read for 4 seconds, then automatically clear both messages
        clearTimerRef.current = setTimeout(() => {
          setCurrentPrompt("");
          setCurrentResponse("");
        }, 4000);
      });
    } catch (error: any) {
      if (error.name === 'AbortError') return;
      isProcessingRef.current = false;
      setCurrentResponse("Sorry, something went wrong. Please try again.");
      updateState('listening');
      startListening();
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    
    // Grab input and reset input field immediately
    const query = textInput.trim();
    setTextInput("");
    
    // Clear out any old processing or responses so the bubble cleanly transitions
    setCurrentResponse("");
    setLiveTranscript("");
    
    // Fire intent processing
    processIntent(query);
  };

  const handleToggleMic = () => {
    if (state === 'listening' || state === 'processing' || state === 'speaking') {
      setIsMicMuted(true);
      stopListening();
      if (synthRef.current) synthRef.current.cancel();
      updateState('idle');
    } else {
      setIsMicMuted(false);
      if (!permissionGranted) requestPermissionAndStart();
      else startListening();
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
          setCurrentPrompt("");
          setCurrentResponse("");
        }}
        currentPrompt={currentPrompt}
        currentResponse={currentResponse}
        textInput={textInput}
        setTextInput={setTextInput}
        onTextSubmit={handleTextSubmit}
        selectedAgent={selectedAgent}
        onOpenAgentSelector={() => setIsAgentSelectorOpen(true)}
      />

      <AgentSelectorModal
        isOpen={isAgentSelectorOpen}
        onClose={() => setIsAgentSelectorOpen(false)}
        selectedAgentId={selectedAgent.id}
        onSelectAgent={(agent) => {
          setSelectedAgent(agent);
          // We speak the welcome message but don't show it as a visual chat response to keep the UI clean
          speak(agent.welcomeMessage);
        }}
      />
    </>
  );
}
