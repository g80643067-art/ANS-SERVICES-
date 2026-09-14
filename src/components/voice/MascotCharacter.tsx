import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, Volume2, Sparkles, HelpCircle, CheckCircle2, MessageCircle, Bot, X, Send } from "lucide-react";
import { AgentOption } from "./AgentSelectorModal";

export type MascotState = "idle" | "listening" | "processing" | "speaking" | "success" | "confused" | "happy" | "angry" | "hungry" | "eating" | "bored" | "exploring";

interface MascotCharacterProps {
  state: MascotState;
  transcript?: string;
  isMuted?: boolean;
  onToggleMic?: () => void;
  lastActionResponse?: string;
  isChatOpen?: boolean;
  onToggleChat?: () => void;
  currentPrompt?: string;
  currentResponse?: string;
  textInput?: string;
  setTextInput?: (val: string) => void;
  onTextSubmit?: (e: React.FormEvent) => void;
  selectedAgent?: AgentOption;
  onOpenAgentSelector?: () => void;
}

export function MascotCharacter({
  state,
  transcript = "",
  isMuted = false,
  onToggleMic,
  lastActionResponse = "",
  isChatOpen = false,
  onToggleChat,
  currentPrompt = "",
  currentResponse = "",
  textInput = "",
  setTextInput,
  onTextSubmit,
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
      if (window.speechSynthesis && (!window.speechSynthesis.speaking || window.speechSynthesis.paused)) {
        setMouthFrame(0);
      } else {
        setMouthFrame((prev) => (prev + 1) % 4);
      }
    }, 130);

    return () => clearInterval(interval);
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

  // Eyes look according to state
  const getPupilOffset = () => {
    if (state === "processing") return { x: 2, y: -3 }; // Looking up thoughtfully
    if (state === "listening") return { x: -2, y: -1 }; // Focused attentively on user
    if (state === "speaking") return { x: 0, y: 0 };
    if (state === "angry") return { x: 0, y: 1 }; // Look down a bit, annoyed
    if (state === "hungry") return { x: 1, y: 1 }; // Slightly tired look
    return gazeDirection;
  };

  const pupilOffset = getPupilOffset();

  // Dynamic glow colors based on state
  const getAuraColor = () => {
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
          {state === "listening" && (
            <motion.div
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
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: -6 }}
              exit={{ opacity: 0, scale: 0.6, y: 5 }}
              className="absolute -top-7 sm:-top-8 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-[11px] font-medium shadow-lg pointer-events-none whitespace-nowrap"
            >
              <Sparkles className="w-3 h-3 animate-spin text-emerald-400" />
              <span>Thinking...</span>
            </motion.div>
          )}

          {state === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: -6 }}
              exit={{ opacity: 0, scale: 0.6, y: 5 }}
              className="absolute -top-7 sm:-top-8 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-emerald-500/50 text-emerald-300 text-[11px] font-medium shadow-lg pointer-events-none whitespace-nowrap"
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Done!</span>
            </motion.div>
          )}

          {state === "confused" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: -6 }}
              exit={{ opacity: 0, scale: 0.6, y: 5 }}
              className="absolute -top-7 sm:-top-8 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-500/50 text-amber-300 text-[11px] font-medium shadow-lg pointer-events-none whitespace-nowrap"
            >
              <HelpCircle className="w-3 h-3 text-amber-400" />
              <span>Poochiye?</span>
            </motion.div>
          )}

          {state === "happy" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: -6 }}
              exit={{ opacity: 0, scale: 0.6, y: 5 }}
              className="absolute -top-7 sm:-top-8 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-[11px] font-medium shadow-lg pointer-events-none whitespace-nowrap"
            >
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Yay!</span>
            </motion.div>
          )}

          {state === "angry" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: -6 }}
              exit={{ opacity: 0, scale: 0.6, y: 5 }}
              className="absolute -top-7 sm:-top-8 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-rose-500/40 text-rose-300 text-[11px] font-medium shadow-lg pointer-events-none whitespace-nowrap"
            >
              <span>Hmph!</span>
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
          title={isMuted ? "Tap to enable voice assistant" : "ANX Voice Receptionist - Listening hands-free"}
        >
          {/* Main Breathing & Gesture Physics Container */}
          <motion.div
            animate={{
              y: state === "speaking" ? [0, -3, 0, -2, 0] : [0, -5, 0],
              rotate: state === "processing" ? 3 : state === "listening" ? -2 : isHovered ? 2 : 0,
            }}
            transition={{
              y: {
                repeat: Infinity,
                duration: state === "speaking" ? 1.4 : 3.2,
                ease: "easeInOut",
              },
              rotate: {
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
                  {state === "processing" ? (
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
                  {isBlinking || state === "success" ? (
                    // Joyful closed curved eyes (^_^)
                    <>
                      <path
                        d="M56 80C60 74 68 74 72 80"
                        stroke="#2B1446"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M88 80C92 74 100 74 104 80"
                        stroke="#2B1446"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                      />
                    </>
                  ) : (
                    // Open, Sparkling Anime Eyes
                    <>
                      {/* Left Eye Sclera & Iris */}
                      <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                        <ellipse cx="64" cy="78" rx="8" ry="11" fill="#FFFFFF" />
                        <ellipse cx="64" cy="78" rx="6.5" ry="9.5" fill={`url(#${agentId}EyeGrad)`} />
                        <ellipse cx="64" cy="79" rx="3.5" ry="5" fill="#180B2B" />
                        {/* Eye Highlights */}
                        <circle cx="62" cy="74" r="2.6" fill="#FFFFFF" />
                        <circle cx="66" cy="82" r="1.3" fill="#FFFFFF" />
                        <circle cx="65.5" cy="75" r="0.9" fill="#E9D5FF" />
                      </g>
                      {/* Upper Eyelash & Lid */}
                      <path
                        d="M55 75C58 69 70 69 73 75"
                        stroke="#220D3A"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />

                      {/* Right Eye Sclera & Iris */}
                      <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                        <ellipse cx="96" cy="78" rx="8" ry="11" fill="#FFFFFF" />
                        <ellipse cx="96" cy="78" rx="6.5" ry="9.5" fill={`url(#${agentId}EyeGrad)`} />
                        <ellipse cx="96" cy="79" rx="3.5" ry="5" fill="#180B2B" />
                        {/* Eye Highlights */}
                        <circle cx="94" cy="74" r="2.6" fill="#FFFFFF" />
                        <circle cx="98" cy="82" r="1.3" fill="#FFFFFF" />
                        <circle cx="97.5" cy="75" r="0.9" fill="#E9D5FF" />
                      </g>
                      {/* Upper Eyelash & Lid */}
                      <path
                        d="M87 75C90 69 102 69 105 75"
                        stroke="#220D3A"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />
                    </>
                  )}
                </g>

                {/* 5. Mouth (Expressive & Speaking Animated) */}
                <g id="mouth">
                  {state === "speaking" ? (
                    // Speaking Mouth Sync Animation Frames
                    mouthFrame === 0 ? (
                      <path d="M74 98C76 104 84 104 86 98H74Z" fill="#C53030" stroke="#741A1A" strokeWidth="1" />
                    ) : mouthFrame === 1 ? (
                      <ellipse cx="80" cy="100" rx="4" ry="4" fill="#C53030" />
                    ) : mouthFrame === 2 ? (
                      <path d="M75 99C77 106 83 106 85 99H75Z" fill="#C53030" stroke="#741A1A" strokeWidth="1" />
                    ) : (
                      <path d="M75 99C77 101 83 101 85 99" stroke="#741A1A" strokeWidth="2.2" strokeLinecap="round" />
                    )
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
