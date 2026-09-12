import React, { useState } from "react";
import {
  Phone,
  MessageCircle,
  Instagram,
  Sparkles,
  ChevronUp,
  X,
} from "lucide-react";

interface FloatingActionDockProps {
  onOpenDemo: () => void;
}

export function FloatingActionDock({ onOpenDemo }: FloatingActionDockProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 pointer-events-auto flex flex-col items-end gap-3">
      {/* Expanded quick items */}
      {expanded && (
        <div className="flex flex-col gap-2 p-2 rounded-2xl bg-slate-950/90 backdrop-blur-2xl border border-purple-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom-3 duration-200">
          <a
            href="tel:+917348382816"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/30 text-xs font-bold text-white transition-all"
            title="Call +91 7348382816"
          >
            <Phone className="w-4 h-4 text-purple-400" />
            <span>Call +91 7348382816</span>
          </a>

          <a
            href="tel:+919219694862"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 transition-all"
            title="Call +91 9219694862"
          >
            <Phone className="w-4 h-4 text-blue-400" />
            <span>Call +91 9219694862</span>
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-pink-950/50 hover:bg-pink-900/70 border border-pink-500/30 text-xs font-bold text-pink-300 transition-all"
          >
            <Instagram className="w-4 h-4 text-pink-400" />
            <span>Instagram ([MY HANDLE])</span>
          </a>
        </div>
      )}

      {/* Main floating pill bar */}
      <div className="flex items-center gap-2 p-1.5 rounded-full bg-slate-950/80 backdrop-blur-2xl border border-purple-500/30 shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
        <a
          href="https://wa.me/917348382816?text=Hi%20ANX,%20I%20am%20interested%20in%20a%20website%20demo."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 shadow-sm transition-all"
          title="WhatsApp Us"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>

        <button
          onClick={onOpenDemo}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-200" />
          <span>Free Demo</span>
        </button>

        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
          aria-label="Toggle contact options"
        >
          {expanded ? <X className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
