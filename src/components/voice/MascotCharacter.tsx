import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, MicOff, Volume2, Sparkles, HelpCircle, CheckCircle2, MessageCircle, Bot, X, Send } from "lucide-react";
import { AgentOption } from "./AgentSelectorModal";

export type MascotState = "idle" | "listening" | "processing" | "speaking" | "success" | "confused" | "happy" | "angry" | "hungry" | "eating" | "bored" | "exploring";

export type MascotEmotion = "neutral" | "happy" | "laughing" | "annoyed" | "sad" | "crying" | "surprised" | "bored";

interface MascotCharacterProps {
  state: MascotState;
  emotion?: MascotEmotion;
  transcript?: string;
  isMuted?: boolean;
  onToggleMic?: () => void;
  lastActionResponse?: string;
  isChatOpen?: boolean;
  onToggleChat?: () => void;
  currentPrompt?: string;
  currentResponse?: string;
  onCloseResponse?: () => void;
  textInput?: string;
  setTextInput?: (val: string) => void;
  onTextSubmit?: (e: React.FormEvent) => void;
  onQuickQuery?: (query: string) => void;
  selectedAgent?: AgentOption;
  onOpenAgentSelector?: () => void;
}

export function MascotCharacter({
  state,
  emotion = "neutral",
  transcript = "",
  isMuted = false,
  onToggleMic,
  lastActionResponse = "",
  isChatOpen = false,
  onToggleChat,
  currentPrompt = "",
  currentResponse = "",
  onCloseResponse,
  textInput = "",
  setTextInput,
  onTextSubmit,
  onQuickQuery,
  selectedAgent,
  onOpenAgentSelector,
}: MascotCharacterProps) {
  // Natural blinking effect
  const [isBlinking, setIsBlinking] = useState(false);
  // Speaking mouth phoneme toggle
  const [mouthFrame, setMouthFrame] = useState(0);
  // Mascot wandering position offset
  const [wanderOffset, setWanderOffset] = useState({ x: 0, y: 0 });
  // Random gaze look direction
  const [gazeDirection, setGazeDirection] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  // Hovered state
  const [isHovered, setIsHovered] = useState(false);

  // Active agent ID for dress-up style and hair/outfit rendering
  const agentId = selectedAgent?.id || "anya";

  // Blinking timer loop
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        // Occasionally double blink
        if (Math.random() > 0.7) {
          setTimeout(() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 120);
          }, 140);
        }
      }, 150);

      const nextInterval = 3000 + Math.random() * 3500;
      blinkTimeout = setTimeout(triggerBlink, nextInterval);
    };

    blinkTimeout = setTimeout(triggerBlink, 3000);
    return () => clearTimeout(blinkTimeout);
  }, []);

  // Mouth animation when speaking
  useEffect(() => {
    if (state !== "speaking") {
      setMouthFrame(0);
      return;
    }

    const interval = setInterval(() => {
      setMouthFrame((prev) => (prev + 1) % 4);
    }, 130);

    return () => {
      clearInterval(interval);
      setMouthFrame(0);
    };
  }, [state]);

  // Subtle wandering movement around safe corner perimeter
  useEffect(() => {
    const wanderInterval = setInterval(() => {
      // Only wander if idle or speaking (don't distract during listening/processing)
      if (state === "idle") {
        // Safe corner drift ranges (max -30px to +10px X, -40px to +15px Y)
        const safeX = (Math.random() - 0.5) * 40;
        const safeY = (Math.random() - 0.5) * 35;
        setWanderOffset({ x: safeX, y: safeY });

        // Random subtle gaze change
        setGazeDirection({
          x: (Math.random() - 0.5) * 4,
          y: (Math.random() - 0.5) * 2,
        });
      }
    }, 10000);

    return () => clearInterval(wanderInterval);
  }, [state]);

  // Eyes look according to state & emotion
  const getPupilOffset = () => {
    if (emotion === "bored") return { x: 3, y: 1 };
    if (emotion === "surprised") return { x: 0, y: -1 };
    if (emotion === "annoyed") return { x: 0, y: 1 };
    if (emotion === "sad" || emotion === "crying") return { x: 0, y: 2 };
    if (state === "processing") return { x: 2, y: -3 }; // Looking up thoughtfully
    if (state === "listening") return { x: -2, y: -1 }; // Focused attentively on user
    if (state === "speaking") return { x: 0, y: 0 };
    if (state === "angry") return { x: 0, y: 1 };
    if (state === "hungry") return { x: 1, y: 1 };
    return gazeDirection;
  };

  const pupilOffset = getPupilOffset();

  // Dynamic glow colors based on state & emotion
  const getAuraColor = () => {
    if (emotion === "annoyed") {
      return "from-rose-500/40 via-red-600/25 to-transparent";
    }
    if (emotion === "laughing" || emotion === "happy") {
      return "from-amber-400/35 via-purple-500/25 to-pink-500/15";
    }
    if (emotion === "sad" || emotion === "crying") {
      return "from-sky-500/35 via-indigo-500/20 to-transparent";
    }
    if (emotion === "surprised") {
      return "from-violet-500/40 via-fuchsia-500/25 to-pink-500/15";
    }
    if (emotion === "bored") {
      return "from-zinc-500/30 via-purple-900/10 to-transparent";
    }

    switch (state) {
      case "listening":
        return "from-cyan-500/30 via-indigo-500/20 to-purple-500/10";
      case "processing":
        return "from-emerald-500/30 via-teal-500/20 to-indigo-500/10";
      case "speaking":
        return "from-purple-500/35 via-violet-500/25 to-pink-500/15";
      case "success":
      case "happy":
        return "from-emerald-400/40 via-purple-500/20 to-amber-400/10";
      case "confused":
        return "from-amber-500/30 via-purple-500/20 to-rose-500/10";
      case "angry":
        return "from-rose-500/30 via-purple-500/20 to-transparent";
      case "hungry":
      case "bored":
        return "from-zinc-500/30 via-purple-900/10 to-transparent";
      default:
        return "from-[#7C3AED]/20 via-purple-900/10 to-transparent";
    }
  };

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] pointer-events-none select-none flex items-end gap-3 sm:gap-4"
      style={{ touchAction: "none" }}
    >
      {/* Small Message Bar positioned to the LEFT of the mascot */}
      <div className="w-[60vw] max-w-[280px] sm:w-72 pointer-events-auto flex flex-col items-end gap-2 select-none mb-2 sm:mb-4">
        {/* Minimal Message Input Bar (Enter key to send) */}
        {onTextSubmit && (
          <form
            onSubmit={onTextSubmit}
            className="w-full bg-slate-950/90 backdrop-blur-xl border border-purple-500/40 rounded-full px-4 py-2.5 shadow-xl flex items-center focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all"
          >
            <input
              type="text"
              value={textInput || ""}
              onChange={(e) => setTextInput && setTextInput(e.target.value)}
              placeholder={`Message ${selectedAgent?.name || "Anya"}...`}
              className="flex-1 bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none"
              autoComplete="off"
            />
          </form>
        )}
      </div>

      {/* Floating Mascot Container */}
      <motion.div
        animate={{
          x: wanderOffset.x,
          y: wanderOffset.y + (state === "speaking" ? -4 : 0),
        }}
        transition={{
          type: "spring",
          damping: 22,
          stiffness: 80,
          mass: 1.2,
        }}
        className="relative flex flex-col items-center"
      >
        {/* Subtle Ambient Glow Aura Behind Mascot */}
        <motion.div
          animate={{
            scale: state === "listening" ? [1, 1.18, 1] : state === "speaking" ? [1, 1.12, 1] : [0.95, 1.05, 0.95],
            opacity: state === "idle" ? 0.35 : 0.65,
          }}
          transition={{
            repeat: Infinity,
            duration: state === "listening" ? 1.4 : state === "speaking" ? 1.8 : 3.5,
            ease: "easeInOut",
          }}
          className={`absolute -inset-6 sm:-inset-8 rounded-full bg-gradient-to-tr ${getAuraColor()} blur-2xl pointer-events-none transition-colors duration-700`}
        />

        {/* State Floating Icon Badge / Speech Mood Indicator */}
        <AnimatePresence>
          {emotion === "laughing" && (
            <motion.div
              key="laughing-badge"
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: -6 }}
              exit={{ opacity: 0, scale: 0.6, y: 5 }}
              className="absolute -top-7 sm:-top-8 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-amber-500/50 text-amber-300 text-[11px] font-medium shadow-lg pointer-events-none whitespace-nowrap"
            >
              <span>Haha! 😄</span>
            </motion.div>
          )}

          {emotion === "annoyed" && (
            <motion.div
              key="annoyed-badge"
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: -6 }}
              exit={{ opacity: 0, scale: 0.6, y: 5 }}
              className="absolute -top-7 sm:-top-8 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-rose-500/60 text-rose-300 text-[11px] font-medium shadow-lg pointer-events-none whitespace-nowrap"
            >
              <span>Hmph! 😤</span>
            </motion.div>
          )}

          {emotion === "crying" && (
            <motion.div
              key="crying-badge"
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: -6 }}
              exit={{ opacity: 0, scale: 0.6, y: 5 }}
              className="absolute -top-7 sm:-top-8 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-sky-500/50 text-sky-300 text-[11px] font-medium shadow-lg pointer-events-none whitespace-nowrap"
            >
              <span>Udaas... 🥺</span>
            </motion.div>
          )}

          {emotion === "sad" && (
            <motion.div
              key="sad-badge"
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: -6 }}
              exit={{ opacity: 0, scale: 0.6, y: 5 }}
              className="absolute -top-7 sm:-top-8 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-sky-500/50 text-sky-300 text-[11px] font-medium shadow-lg pointer-events-none whitespace-nowrap"
            >
              <span>Aww... 🥺</span>
            </motion.div>
          )}

          {emotion === "surprised" && (
            <motion.div
              key="surprised-badge"
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: -6 }}
              exit={{ opacity: 0, scale: 0.6, y: 5 }}
              className="absolute -top-7 sm:-top-8 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-violet-500/50 text-violet-300 text-[11px] font-medium shadow-lg pointer-events-none whitespace-nowrap"
            >
              <span>Whoa! 😲</span>
            </motion.div>
          )}

          {emotion === "bored" && (
            <motion.div
              key="bored-badge"
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: -6 }}
              exit={{ opacity: 0, scale: 0.6, y: 5 }}
              className="absolute -top-7 sm:-top-8 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-zinc-500/50 text-zinc-300 text-[11px] font-medium shadow-lg pointer-events-none whitespace-nowrap"
            >
              <span>Zzz... 🥱</span>
            </motion.div>
          )}

          {state === "listening" && emotion !== "annoyed" && emotion !== "crying" && emotion !== "laughing" && (
            <motion.div
              key="listening-badge"
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: -6 }}
              exit={{ opacity: 0, scale: 0.6, y: 5 }}
              className="absolute -top-7 sm:-top-8 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-[11px] font-medium shadow-lg pointer-events-none whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Listening...</span>
            </motion.div>
          )}

          {state === "processing" && (
            <motion.div
              key="processing-badge"
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: -6 }}
              exit={{ opacity: 0, scale: 0.6, y: 5 }}
              className="absolute -top-7 sm:-top-8 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-[11px] font-medium shadow-lg pointer-events-none whitespace-nowrap"
            >
              <Sparkles className="w-3 h-3 animate-spin text-emerald-400" />
              <span>Thinking...</span>
            </motion.div>
          )}

          {state === "success" && emotion !== "annoyed" && emotion !== "crying" && (
            <motion.div
              key="success-badge"
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: -6 }}
              exit={{ opacity: 0, scale: 0.6, y: 5 }}
              className="absolute -top-7 sm:-top-8 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-emerald-500/50 text-emerald-300 text-[11px] font-medium shadow-lg pointer-events-none whitespace-nowrap"
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Done!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mascot Character Interactive Wrapper */}
        <motion.div
          onClick={onToggleMic}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className="relative pointer-events-auto cursor-pointer focus:outline-none"
          title={isMuted ? "Tap to enable voice companion" : "Virtual Companion - Listening hands-free"}
        >
          {/* Main Breathing & Gesture Physics Container */}
          <motion.div
            animate={{
              y: emotion === "laughing"
                ? [0, -6, 0, -4, 0]
                : emotion === "sad" || emotion === "crying"
                ? [0, 2, 0]
                : emotion === "surprised"
                ? [0, -6, 0]
                : state === "speaking"
                ? [0, -3, 0, -2, 0]
                : [0, -5, 0],
              rotate: emotion === "annoyed"
                ? -4
                : emotion === "bored"
                ? 4
                : emotion === "laughing"
                ? [0, 2, -2, 0]
                : state === "processing"
                ? 3
                : state === "listening"
                ? -2
                : isHovered
                ? 2
                : 0,
            }}
            transition={{
              y: {
                repeat: Infinity,
                duration: emotion === "laughing" ? 1.1 : state === "speaking" ? 1.4 : 3.2,
                ease: "easeInOut",
              },
              rotate: emotion === "laughing"
                ? {
                    repeat: Infinity,
                    duration: 1.1,
                    ease: "easeInOut",
                  }
                : {
                    type: "spring",
                    stiffness: 120,
                    damping: 15,
                  },
            }}
            className="w-20 h-28 sm:w-24 sm:h-32 relative"
          >
            {/* SVG Cartoon Girl Mascot Vector Illustration */}
            <svg
              viewBox="0 0 160 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-xl overflow-visible"
            >
              <defs>
                {/* Skin Gradient */}
                <linearGradient id="skinGrad" x1="80" y1="50" x2="80" y2="130" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFF2EC" />
                  <stop offset="100%" stopColor="#FBD7C7" />
                </linearGradient>

                {/* Hair Gradients */}
                <linearGradient id="anyaHairGrad" x1="80" y1="20" x2="80" y2="140" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#2E1848" />
                  <stop offset="60%" stopColor="#1E1032" />
                  <stop offset="100%" stopColor="#130822" />
                </linearGradient>
                <linearGradient id="jarvisHairGrad" x1="80" y1="20" x2="80" y2="140" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#164E63" />
                  <stop offset="100%" stopColor="#083344" />
                </linearGradient>
                <linearGradient id="mayaHairGrad" x1="80" y1="20" x2="80" y2="140" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#881337" />
                  <stop offset="100%" stopColor="#4C0519" />
                </linearGradient>
                <linearGradient id="alexHairGrad" x1="80" y1="20" x2="80" y2="140" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#064E3B" />
                  <stop offset="100%" stopColor="#022C22" />
                </linearGradient>

                {/* Clothing Gradients */}
                <linearGradient id="anyaJacketGrad" x1="80" y1="130" x2="80" y2="190" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#2A1B4E" />
                  <stop offset="100%" stopColor="#140D26" />
                </linearGradient>
                <linearGradient id="jarvisSuitGrad" x1="80" y1="130" x2="80" y2="190" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#1E293B" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>
                <linearGradient id="mayaDressGrad" x1="80" y1="130" x2="80" y2="190" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#4C1D95" />
                  <stop offset="100%" stopColor="#2E1065" />
                </linearGradient>
                <linearGradient id="alexSuitGrad" x1="80" y1="130" x2="80" y2="190" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#111827" />
                  <stop offset="100%" stopColor="#030712" />
                </linearGradient>

                {/* Eye Gradients */}
                <linearGradient id="anyaEyeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4338CA" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
                <linearGradient id="jarvisEyeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0891B2" />
                  <stop offset="100%" stopColor="#22D3EE" />
                </linearGradient>
                <linearGradient id="mayaEyeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#BE123C" />
                  <stop offset="100%" stopColor="#FB7185" />
                </linearGradient>
                <linearGradient id="alexEyeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#047857" />
                  <stop offset="100%" stopColor="#34D399" />
                </linearGradient>
                {/* Annoyed Glowing Red Eye Gradient */}
                <linearGradient id="annoyedEyeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#DC2626" />
                  <stop offset="50%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#991B1B" />
                </linearGradient>
                {/* Watery Eye Gradient for Sad/Crying */}
                <linearGradient id="wateryEyeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="50%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#818CF8" />
                </linearGradient>

                {/* Cyber Headset Purple Neon */}
                <linearGradient id="headsetGrad" x1="20" y1="60" x2="140" y2="100" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="50%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#4F46E5" />
                </linearGradient>
              </defs>

              {/* 1. Back Hair Layer */}
              <g className="transition-transform duration-300">
                {agentId === "anya" && (
                  <>
                    <path d="M40 70C20 85 10 115 15 140C20 160 38 150 42 135C45 120 45 95 48 80Z" fill="url(#anyaHairGrad)" />
                    <path d="M120 70C140 85 150 115 145 140C140 160 122 150 118 135C115 120 115 95 112 80Z" fill="url(#anyaHairGrad)" />
                    <circle cx="38" cy="82" r="5" fill="#7C3AED" />
                    <circle cx="122" cy="82" r="5" fill="#7C3AED" />
                    <circle cx="38" cy="82" r="2.5" fill="#C084FC" />
                    <circle cx="122" cy="82" r="2.5" fill="#C084FC" />
                  </>
                )}
                {agentId === "jarvis" && (
                  <path d="M50 50C40 80 55 100 80 100C105 100 120 80 110 50Z" fill="url(#jarvisHairGrad)" />
                )}
                {agentId === "maya" && (
                  <path d="M45 50C30 90 25 150 40 160C50 165 60 130 65 110C65 110 100 110 100 110C105 130 110 165 120 160C135 150 130 90 115 50Z" fill="url(#mayaHairGrad)" />
                )}
                {agentId === "alex" && (
                  <path d="M55 40C45 60 55 90 80 90C105 90 115 60 105 40Z" fill="url(#alexHairGrad)" />
                )}
              </g>

              {/* 2. Body / Clothing */}
              <g id="body">
                <path d="M72 120H88V136H72V120Z" fill="url(#skinGrad)" />
                
                {agentId === "anya" && (
                  <>
                    <path d="M46 138C46 134 52 132 64 132H96C108 132 114 134 114 138L122 195H38L46 138Z" fill="url(#anyaJacketGrad)" />
                    <path d="M62 132L80 156L98 132H88L80 144L72 132H62Z" fill="#7C3AED" />
                    <path d="M72 132L80 144L88 132H72Z" fill="#F3E8FF" />
                    <rect x="74" y="160" width="12" height="6" rx="2" fill="#7C3AED" />
                    <rect x="77" y="162" width="6" height="2" rx="1" fill="#E9D5FF" />
                  </>
                )}
                {agentId === "jarvis" && (
                  <>
                    <path d="M46 138C46 134 52 128 64 128H96C108 128 114 134 114 138L122 195H38L46 138Z" fill="url(#jarvisSuitGrad)" />
                    <path d="M66 120H94V136H66Z" fill="#0D1F2D" />
                    <circle cx="80" cy="155" r="8" fill="none" stroke="#22D3EE" strokeWidth="2" className={state === "listening" ? "animate-pulse" : ""} />
                    <circle cx="80" cy="155" r="3" fill="#22D3EE" />
                  </>
                )}
                {agentId === "maya" && (
                  <>
                    <path d="M46 138C46 134 52 132 64 132H96C108 132 114 134 114 138L122 195H38L46 138Z" fill="url(#mayaDressGrad)" />
                    <path d="M60 125C70 145 90 145 100 125L90 160C80 170 70 170 60 160Z" fill="#FDA4AF" />
                  </>
                )}
                {agentId === "alex" && (
                  <>
                    <path d="M46 138C46 134 52 132 64 132H96C108 132 114 134 114 138L122 195H38L46 138Z" fill="url(#alexSuitGrad)" />
                    <path d="M65 130L80 155L95 130H65Z" fill="#F8FAFC" />
                    <path d="M76 145L80 185L84 145Z" fill="#047857" />
                    <path d="M55 130L70 170L65 130Z" fill="#0F172A" stroke="#064E3B" strokeWidth="1" />
                    <path d="M105 130L90 170L95 130Z" fill="#0F172A" stroke="#064E3B" strokeWidth="1" />
                  </>
                )}

                {/* Sleeves */}
                {state === "speaking" ? (
                  <g>
                    <path d="M38 145C32 155 30 170 38 175C44 178 48 165 46 155Z" fill={`url(#${agentId === 'anya' ? 'anyaJacketGrad' : agentId === 'jarvis' ? 'jarvisSuitGrad' : agentId === 'maya' ? 'mayaDressGrad' : 'alexSuitGrad'})`} />
                    <circle cx="37" cy="175" r="4.5" fill="url(#skinGrad)" />
                    <path d="M122 145C128 155 130 170 122 175C116 178 112 165 114 155Z" fill={`url(#${agentId === 'anya' ? 'anyaJacketGrad' : agentId === 'jarvis' ? 'jarvisSuitGrad' : agentId === 'maya' ? 'mayaDressGrad' : 'alexSuitGrad'})`} />
                    <circle cx="123" cy="175" r="4.5" fill="url(#skinGrad)" />
                  </g>
                ) : (
                  <g>
                    <path d="M42 142C36 150 36 168 40 178C44 182 48 174 48 165Z" fill={`url(#${agentId === 'anya' ? 'anyaJacketGrad' : agentId === 'jarvis' ? 'jarvisSuitGrad' : agentId === 'maya' ? 'mayaDressGrad' : 'alexSuitGrad'})`} />
                    <circle cx="41" cy="178" r="4" fill="url(#skinGrad)" />
                    <path d="M118 142C124 150 124 168 120 178C116 182 112 174 112 165Z" fill={`url(#${agentId === 'anya' ? 'anyaJacketGrad' : agentId === 'jarvis' ? 'jarvisSuitGrad' : agentId === 'maya' ? 'mayaDressGrad' : 'alexSuitGrad'})`} />
                    <circle cx="119" cy="178" r="4" fill="url(#skinGrad)" />
                  </g>
                )}
              </g>

              {/* 3. Head Base (Soft cute anime face contour) */}
              <g id="head">
                <path
                  d="M48 76C48 48 62 34 80 34C98 34 112 48 112 76C112 104 98 126 80 126C62 126 48 104 48 76Z"
                  fill="url(#skinGrad)"
                />

                {/* Soft Rosy Cheeks (Blushing) */}
                <ellipse
                  cx="58"
                  cy="92"
                  rx="7"
                  ry="4"
                  fill="#FF8A9E"
                  opacity={state === "speaking" || state === "success" ? 0.7 : 0.45}
                />
                <ellipse
                  cx="102"
                  cy="92"
                  rx="7"
                  ry="4"
                  fill="#FF8A9E"
                  opacity={state === "speaking" || state === "success" ? 0.7 : 0.45}
                />

                {/* Cute Tiny Nose */}
                <circle cx="80" cy="88" r="1.2" fill="#E89B84" />

                {/* 4. Eyes & Eyebrows */}
                {/* Eyebrows */}
                <g id="eyebrows">
                  {emotion === "annoyed" ? (
                    // Furrowed, slightly annoyed eyebrows
                    <>
                      <path d="M56 68L71 63" stroke="#492868" strokeWidth="2.4" strokeLinecap="round" />
                      <path d="M89 63L104 68" stroke="#492868" strokeWidth="2.4" strokeLinecap="round" />
                      <path d="M78 65L82 65" stroke="#EF4444" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
                    </>
                  ) : emotion === "sad" || emotion === "crying" ? (
                    // Melancholic / sympathetic eyebrows curved up towards middle
                    <>
                      <path d="M57 62C62 66 67 66 71 64" stroke="#492868" strokeWidth="2" strokeLinecap="round" />
                      <path d="M89 64C93 66 98 66 103 62" stroke="#492868" strokeWidth="2" strokeLinecap="round" />
                    </>
                  ) : emotion === "surprised" ? (
                    // High arched surprised eyebrows
                    <>
                      <path d="M56 61C61 56 67 56 71 61" stroke="#492868" strokeWidth="2.2" strokeLinecap="round" />
                      <path d="M89 61C93 56 99 56 104 61" stroke="#492868" strokeWidth="2.2" strokeLinecap="round" />
                    </>
                  ) : emotion === "bored" ? (
                    // Slightly drooped flat eyebrows
                    <>
                      <path d="M58 66H70" stroke="#492868" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M90 66H102" stroke="#492868" strokeWidth="1.8" strokeLinecap="round" />
                    </>
                  ) : emotion === "happy" || emotion === "laughing" ? (
                    // High cheerful arched eyebrows
                    <>
                      <path d="M57 63C62 59 67 59 71 63" stroke="#492868" strokeWidth="2" strokeLinecap="round" />
                      <path d="M89 63C93 59 98 59 103 63" stroke="#492868" strokeWidth="2" strokeLinecap="round" />
                    </>
                  ) : state === "processing" ? (
                    // Inquisitive curved eyebrows
                    <>
                      <path d="M57 65C62 61 68 63 71 66" stroke="#492868" strokeWidth="2" strokeLinecap="round" />
                      <path d="M89 66C92 63 98 61 103 65" stroke="#492868" strokeWidth="2" strokeLinecap="round" />
                    </>
                  ) : state === "listening" ? (
                    // Attentive alert eyebrows
                    <>
                      <path d="M57 64C62 62 67 63 71 65" stroke="#492868" strokeWidth="2" strokeLinecap="round" />
                      <path d="M89 65C93 63 98 62 103 64" stroke="#492868" strokeWidth="2" strokeLinecap="round" />
                    </>
                  ) : (
                    // Gentle friendly eyebrows
                    <>
                      <path d="M58 66C63 64 67 65 70 67" stroke="#492868" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M90 67C93 65 97 64 102 66" stroke="#492868" strokeWidth="1.8" strokeLinecap="round" />
                    </>
                  )}
                </g>

                {/* EYES */}
                <g id="eyes">
                  {emotion === "laughing" || (isBlinking && emotion !== "surprised") || state === "success" ? (
                    // Joyful closed curved eyes (^_^)
                    <>
                      <path
                        d="M56 80C60 73 68 73 72 80"
                        stroke="#2B1446"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M88 80C92 73 100 73 104 80"
                        stroke="#2B1446"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                      />
                    </>
                  ) : emotion === "surprised" ? (
                    // Widened Surprised Eyes
                    <>
                      {/* Left Eye */}
                      <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                        <ellipse cx="64" cy="78" rx="9" ry="12.5" fill="#FFFFFF" />
                        <ellipse cx="64" cy="78" rx="7.5" ry="11" fill={`url(#${agentId}EyeGrad)`} />
                        <ellipse cx="64" cy="78" rx="4.2" ry="6" fill="#180B2B" />
                        <circle cx="61.5" cy="73" r="3.2" fill="#FFFFFF" />
                        <circle cx="67" cy="83" r="1.5" fill="#FFFFFF" />
                      </g>
                      <path d="M54 73C58 66 70 66 74 73" stroke="#220D3A" strokeWidth="3" strokeLinecap="round" />

                      {/* Right Eye */}
                      <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                        <ellipse cx="96" cy="78" rx="9" ry="12.5" fill="#FFFFFF" />
                        <ellipse cx="96" cy="78" rx="7.5" ry="11" fill={`url(#${agentId}EyeGrad)`} />
                        <ellipse cx="96" cy="78" rx="4.2" ry="6" fill="#180B2B" />
                        <circle cx="93.5" cy="73" r="3.2" fill="#FFFFFF" />
                        <circle cx="99" cy="83" r="1.5" fill="#FFFFFF" />
                      </g>
                      <path d="M86 73C90 66 102 66 106 73" stroke="#220D3A" strokeWidth="3" strokeLinecap="round" />
                    </>
                  ) : (
                    // Open Eyes with Dynamic Emotional Expressions
                    <>
                      {/* Left Eye Sclera & Iris */}
                      <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                        <ellipse cx="64" cy="78" rx="8" ry="11" fill="#FFFFFF" />
                        <ellipse
                          cx="64"
                          cy="78"
                          rx="6.5"
                          ry="9.5"
                          fill={
                            emotion === "annoyed"
                              ? "url(#annoyedEyeGrad)"
                              : emotion === "sad" || emotion === "crying"
                              ? "url(#wateryEyeGrad)"
                              : `url(#${agentId}EyeGrad)`
                          }
                          className="transition-colors duration-500"
                        />
                        <ellipse cx="64" cy="79" rx="3.5" ry="5" fill="#180B2B" />
                        {/* Annoyed glowing ruby ring */}
                        {emotion === "annoyed" && (
                          <ellipse cx="64" cy="78" rx="6.5" ry="9.5" fill="none" stroke="#EF4444" strokeWidth="1.2" opacity="0.8" />
                        )}
                        {/* Eye Highlights */}
                        <circle cx="62" cy="74" r={emotion === "sad" || emotion === "crying" ? 3.2 : 2.6} fill="#FFFFFF" />
                        <circle cx="66" cy="82" r={emotion === "sad" || emotion === "crying" ? 2 : 1.3} fill="#FFFFFF" />
                        <circle cx="65.5" cy="75" r="0.9" fill="#E9D5FF" />
                      </g>
                      {/* Upper Eyelash & Lid */}
                      <path
                        d={emotion === "bored" ? "M55 77C58 74 70 74 73 77" : "M55 75C58 69 70 69 73 75"}
                        stroke="#220D3A"
                        strokeWidth={emotion === "bored" ? 3.4 : 2.8}
                        strokeLinecap="round"
                      />
                      {/* Bored half-lidded shade */}
                      {emotion === "bored" && (
                        <path d="M56 71C60 76 68 76 72 71L72 68H56Z" fill="#FBD7C7" opacity="0.9" />
                      )}
                      {/* Watery glimmer for Sad / Crying */}
                      {(emotion === "sad" || emotion === "crying") && (
                        <ellipse cx="64" cy="85" rx="5" ry="1.6" fill="#E0F2FE" opacity="0.8" />
                      )}

                      {/* Right Eye Sclera & Iris */}
                      <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                        <ellipse cx="96" cy="78" rx="8" ry="11" fill="#FFFFFF" />
                        <ellipse
                          cx="96"
                          cy="78"
                          rx="6.5"
                          ry="9.5"
                          fill={
                            emotion === "annoyed"
                              ? "url(#annoyedEyeGrad)"
                              : emotion === "sad" || emotion === "crying"
                              ? "url(#wateryEyeGrad)"
                              : `url(#${agentId}EyeGrad)`
                          }
                          className="transition-colors duration-500"
                        />
                        <ellipse cx="96" cy="79" rx="3.5" ry="5" fill="#180B2B" />
                        {/* Annoyed glowing ruby ring */}
                        {emotion === "annoyed" && (
                          <ellipse cx="96" cy="78" rx="6.5" ry="9.5" fill="none" stroke="#EF4444" strokeWidth="1.2" opacity="0.8" />
                        )}
                        {/* Eye Highlights */}
                        <circle cx="94" cy="74" r={emotion === "sad" || emotion === "crying" ? 3.2 : 2.6} fill="#FFFFFF" />
                        <circle cx="98" cy="82" r={emotion === "sad" || emotion === "crying" ? 2 : 1.3} fill="#FFFFFF" />
                        <circle cx="97.5" cy="75" r="0.9" fill="#E9D5FF" />
                      </g>
                      {/* Upper Eyelash & Lid */}
                      <path
                        d={emotion === "bored" ? "M87 77C90 74 102 74 105 77" : "M87 75C90 69 102 69 105 75"}
                        stroke="#220D3A"
                        strokeWidth={emotion === "bored" ? 3.4 : 2.8}
                        strokeLinecap="round"
                      />
                      {/* Bored half-lidded shade */}
                      {emotion === "bored" && (
                        <path d="M88 71C92 76 100 76 104 71L104 68H88Z" fill="#FBD7C7" opacity="0.9" />
                      )}
                      {/* Watery glimmer for Sad / Crying */}
                      {(emotion === "sad" || emotion === "crying") && (
                        <ellipse cx="96" cy="85" rx="5" ry="1.6" fill="#E0F2FE" opacity="0.8" />
                      )}
                    </>
                  )}
                </g>

                {/* Subtle Tiny Animated Tear Droplets when Crying */}
                {emotion === "crying" && (
                  <g id="tears">
                    <motion.ellipse
                      cx="59"
                      cy="86"
                      rx="1.4"
                      ry="2.2"
                      fill="#38BDF8"
                      animate={{
                        cy: [86, 95, 106],
                        opacity: [0, 0.85, 0],
                        scaleY: [0.8, 1.2, 0.4],
                      }}
                      transition={{
                        duration: 1.3,
                        repeat: Infinity,
                        ease: "easeIn",
                      }}
                    />
                    <motion.ellipse
                      cx="101"
                      cy="86"
                      rx="1.4"
                      ry="2.2"
                      fill="#38BDF8"
                      animate={{
                        cy: [86, 96, 107],
                        opacity: [0, 0.85, 0],
                        scaleY: [0.8, 1.2, 0.4],
                      }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "easeIn",
                        delay: 0.35,
                      }}
                    />
                  </g>
                )}

                {/* 5. Mouth (Expressive & Speaking Animated) */}
                <g id="mouth">
                  {state === "speaking" ? (
                    // Speaking Mouth Sync Animation Frames
                    emotion === "laughing" ? (
                      // Speaking while laughing (wider open with visible teeth)
                      mouthFrame === 0 ? (
                        <g id="laugh-mouth-0">
                          <path d="M72 97C74 104 86 104 88 97H72Z" fill="#991B1B" stroke="#741A1A" strokeWidth="0.8" />
                          <path d="M73 97C75 99.5 85 99.5 87 97H73Z" fill="#FFFFFF" />
                          <ellipse cx="80" cy="103" rx="3.5" ry="1.5" fill="#F43F5E" />
                        </g>
                      ) : mouthFrame === 1 ? (
                        <g id="laugh-mouth-1">
                          <ellipse cx="80" cy="100" rx="5" ry="4" fill="#991B1B" stroke="#741A1A" strokeWidth="0.8" />
                          <path d="M75 97C77 99 83 99 85 97H75Z" fill="#FFFFFF" />
                          <ellipse cx="80" cy="102" rx="3" ry="1.8" fill="#F43F5E" />
                        </g>
                      ) : mouthFrame === 2 ? (
                        <g id="laugh-mouth-2">
                          <path d="M73 97C75 106 85 106 87 97H73Z" fill="#991B1B" stroke="#741A1A" strokeWidth="0.8" />
                          <path d="M74 97C76 100 84 100 86 97H74Z" fill="#FFFFFF" />
                        </g>
                      ) : (
                        <path d="M72 98C75 103 85 103 88 98" stroke="#822727" strokeWidth="2.4" strokeLinecap="round" />
                      )
                    ) : mouthFrame === 0 ? (
                      <path
                        d="M74 98C77 102 83 102 86 98"
                        stroke="#822727"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    ) : mouthFrame === 1 ? (
                      <ellipse cx="80" cy="100" rx="4" ry="3.5" fill="#C53030" stroke="#741A1A" strokeWidth="0.8" />
                    ) : mouthFrame === 2 ? (
                      <path d="M75 99C77 106 83 106 85 99H75Z" fill="#C53030" stroke="#741A1A" strokeWidth="1" />
                    ) : (
                      <ellipse cx="80" cy="99" rx="3" ry="2" fill="#E53E3E" opacity="0.9" />
                    )
                  ) : emotion === "laughing" ? (
                    // VERY HAPPY / LAUGHING: Bigger smile, teeth visible!
                    <g id="laughing-smile">
                      <path d="M72 97C72 97 74.5 105 80 105C85.5 105 88 97 88 97H72Z" fill="#991B1B" stroke="#741A1A" strokeWidth="0.8" />
                      {/* Pearly white upper teeth */}
                      <path d="M73.5 97C75.5 99.8 84.5 99.8 86.5 97H73.5Z" fill="#FFFFFF" />
                      {/* Cute tongue */}
                      <ellipse cx="80" cy="103" rx="3.5" ry="1.8" fill="#F43F5E" />
                    </g>
                  ) : emotion === "happy" ? (
                    // Natural happy smile
                    <path
                      d="M73 98C76 103 84 103 87 98"
                      stroke="#822727"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  ) : emotion === "annoyed" ? (
                    // Annoyed slightly furrowed/pouting mouth
                    <path d="M74 101C77 98 83 98 86 101" stroke="#741A1A" strokeWidth="2.2" strokeLinecap="round" />
                  ) : emotion === "sad" || emotion === "crying" ? (
                    // Reduced smile, drooped sad mouth
                    <path d="M74 102C77 99 83 99 86 102" stroke="#741A1A" strokeWidth="2" strokeLinecap="round" />
                  ) : emotion === "surprised" ? (
                    // Cute open 'o' surprise gasp
                    <ellipse cx="80" cy="100" rx="3.2" ry="4.2" fill="#881337" stroke="#4C0519" strokeWidth="0.8" />
                  ) : emotion === "bored" ? (
                    // Indifferent straight line mouth
                    <path d="M75 100H85" stroke="#741A1A" strokeWidth="1.8" strokeLinecap="round" />
                  ) : state === "listening" ? (
                    // Attentive slightly parted 'o' mouth
                    <ellipse cx="80" cy="99" rx="3" ry="2.2" fill="#E53E3E" opacity="0.8" />
                  ) : state === "confused" ? (
                    // Slightly wavy / quizzical mouth
                    <path d="M75 100C77 98 81 102 85 99" stroke="#741A1A" strokeWidth="2" strokeLinecap="round" />
                  ) : (
                    // Cute gentle resting smile
                    <path
                      d="M74 98C77 102 83 102 86 98"
                      stroke="#822727"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  )}
                </g>

                {/* 6. Front Hair Bangs */}
                <g id="front-hair">
                  {agentId === "anya" && (
                    <>
                      <path d="M48 58C48 42 60 34 78 34C82 34 85 35 88 36C78 44 65 52 56 68L48 58Z" fill="url(#anyaHairGrad)" />
                      <path d="M74 34C84 42 90 54 88 68C84 56 78 48 68 44L74 34Z" fill="#351C54" />
                      <path d="M86 34C98 34 112 42 112 58L104 68C98 52 92 42 86 34Z" fill="url(#anyaHairGrad)" />
                    </>
                  )}
                  {agentId === "jarvis" && (
                    <>
                      <path d="M45 65L55 40L70 55L85 35L100 55L115 45L115 65C100 75 60 75 45 65Z" fill="url(#jarvisHairGrad)" />
                      <path d="M60 45L75 30L85 45Z" fill="#22D3EE" opacity="0.3" />
                    </>
                  )}
                  {agentId === "maya" && (
                    <>
                      <path d="M40 70C40 30 70 20 100 30C110 40 115 70 110 80C95 50 70 45 50 65Z" fill="url(#mayaHairGrad)" />
                      <path d="M95 30C115 40 125 70 120 90C110 60 100 50 95 30Z" fill="url(#mayaHairGrad)" />
                    </>
                  )}
                  {agentId === "alex" && (
                    <>
                      <path d="M45 60C45 35 70 25 90 30C105 35 115 50 115 65C100 45 70 40 50 55Z" fill="url(#alexHairGrad)" />
                    </>
                  )}
                </g>

                {/* 7. Accessories */}
                <g id="accessories">
                  {agentId === "anya" && (
                    <>
                      <path d="M46 72C42 45 60 28 80 28C100 28 118 45 114 72" stroke="url(#headsetGrad)" strokeWidth="4" strokeLinecap="round" />
                      <rect x="42" y="66" width="7" height="18" rx="3.5" fill="#7C3AED" />
                      <circle cx="45.5" cy="75" r="2.5" fill="#C084FC" />
                      <rect x="111" y="66" width="7" height="18" rx="3.5" fill="#7C3AED" />
                      <circle cx="114.5" cy="75" r="2.5" fill="#C084FC" />
                      <path d="M113 78C110 92 98 98 88 98" stroke="#A855F7" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                      <circle cx="88" cy="98" r={state === "listening" || state === "speaking" ? 3 : 2} fill={state === "listening" ? "#22D3EE" : state === "speaking" ? "#C084FC" : "#7C3AED"} className={state === "listening" ? "animate-pulse" : ""} />
                    </>
                  )}
                  {agentId === "jarvis" && (
                    <>
                      <path d="M45 75C60 85 100 85 115 75L110 65C95 75 65 75 50 65Z" fill="#22D3EE" opacity="0.4" />
                      <path d="M45 75C60 85 100 85 115 75" stroke="#06B6D4" strokeWidth="2" fill="none" className={state === "listening" ? "animate-pulse" : ""} />
                    </>
                  )}
                  {agentId === "maya" && (
                    <g transform="rotate(-15 75 35)">
                      <ellipse cx="75" cy="35" rx="35" ry="15" fill="#BE123C" />
                      <ellipse cx="75" cy="32" rx="30" ry="12" fill="#9F1239" />
                      <circle cx="75" cy="20" r="3" fill="#4C0519" />
                    </g>
                  )}
                  {agentId === "alex" && (
                    <>
                      <rect x="108" y="65" width="6" height="18" rx="3" fill="#0F172A" />
                      <circle cx="111" cy="78" r="1.5" fill="#34D399" className={state === "listening" || state === "speaking" ? "animate-pulse" : ""} />
                    </>
                  )}
                </g>
              </g>
            </svg>

            {/* Small status indicator pill next to mascot */}
            <div className="absolute -bottom-1 right-1 flex items-center justify-center">
              <span
                className={`w-3 h-3 rounded-full border-2 border-[#0D091A] shadow-md ${
                  isMuted
                    ? "bg-zinc-500"
                    : state === "listening"
                    ? "bg-cyan-400 animate-pulse"
                    : state === "speaking"
                    ? "bg-purple-400 animate-ping"
                    : state === "processing"
                    ? "bg-emerald-400 animate-spin"
                    : "bg-emerald-500"
                }`}
              />
            </div>
          </motion.div>
        </motion.div>

      </motion.div>
    </div>
  );
}
