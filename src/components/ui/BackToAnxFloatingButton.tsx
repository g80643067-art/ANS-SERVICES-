import React from "react";
import { ArrowLeft, Sparkles } from "lucide-react";

interface BackToAnxFloatingButtonProps {
  onBackToAgency?: () => void;
  className?: string;
  theme?: "dark" | "warm" | "cyber" | "luxury";
}

export function BackToAnxFloatingButton({
  onBackToAgency,
  className = "",
  theme = "dark",
}: BackToAnxFloatingButtonProps) {
  const handleClick = () => {
    if (onBackToAgency) {
      onBackToAgency();
    } else {
      window.location.href = window.location.origin + window.location.pathname;
    }
  };

  // Theme styling variants to harmoniously blend with each demo's unique aesthetic
  const themeStyles = {
    dark: "bg-slate-950/90 hover:bg-black text-white border-purple-500/40 hover:border-purple-400 shadow-[0_8px_30px_rgba(0,0,0,0.6)]",
    warm: "bg-[#3C2415]/95 hover:bg-[#25150C] text-[#FDF8F3] border-[#E6A15C]/40 hover:border-[#E6A15C] shadow-[0_8px_30px_rgba(60,36,21,0.5)]",
    cyber: "bg-[#070D18]/95 hover:bg-black text-white border-cyan-400/40 hover:border-cyan-400 shadow-[0_8px_30px_rgba(6,182,212,0.35)]",
    luxury: "bg-[#18110D]/95 hover:bg-black text-[#F4D4BA] border-[#8F5E3B]/50 hover:border-[#F4D4BA] shadow-[0_8px_30px_rgba(0,0,0,0.6)]",
  };

  const iconBgStyles = {
    dark: "bg-purple-600/30 text-purple-300",
    warm: "bg-[#E6A15C]/25 text-[#E6A15C]",
    cyber: "bg-cyan-500/25 text-cyan-300",
    luxury: "bg-[#8F5E3B]/40 text-[#F4D4BA]",
  };

  return (
    <button
      onClick={handleClick}
      id="floating-back-to-anx-btn"
      aria-label="Back to ANX Site"
      className={`fixed bottom-6 left-6 z-50 group flex items-center gap-2.5 px-4 py-2.5 rounded-full border backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none ${themeStyles[theme]} ${className}`}
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center group-hover:-translate-x-0.5 transition-transform duration-200 ${iconBgStyles[theme]}`}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
      </div>
      <div className="flex items-center gap-1.5 text-xs font-bold tracking-wide">
        <span>Back to</span>
        <span className="font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300">
          ANX
        </span>
        <span>Site</span>
      </div>
    </button>
  );
}
