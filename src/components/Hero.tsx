import React from "react";
import {
  Phone,
  MessageCircle,
  Instagram,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  ChevronDown,
  Utensils,
} from "lucide-react";

interface HeroProps {
  onOpenDemo: () => void;
  onOpenContact: () => void;
  onScrollToServices: () => void;
}

export function Hero({
  onOpenDemo,
  onOpenContact,
  onScrollToServices,
}: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 text-center"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Eyebrow badge */}
        <div className="pointer-events-auto inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-xl border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 shadow-[0_0_20px_rgba(168,85,247,0.2)] animate-pulse">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
          <span className="text-white font-extrabold tracking-widest">ANX</span>
          <span className="text-slate-500">|</span>
          <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            WEBSITE DEVELOPMENT SERVICES
          </span>
        </div>

        {/* Hero Headlines */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.08] mb-6">
          <span className="block drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            “Premium Websites.”
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 drop-shadow-[0_0_40px_rgba(168,85,247,0.35)]">
            “Under Your Budget.”
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-2xl md:text-3xl font-medium text-slate-200/90 max-w-3xl mb-10 tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          “Customization According To Your Needs.”
        </p>

        {/* CTA Buttons */}
        <div className="pointer-events-auto flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
          <button
            onClick={onOpenDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-[0_0_35px_rgba(147,51,234,0.5)] hover:shadow-[0_0_50px_rgba(147,51,234,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer group"
          >
            <Sparkles className="w-5 h-5 text-purple-200 animate-spin" style={{ animationDuration: "6s" }} />
            <span>Get Free Demo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-slate-200 bg-slate-950/70 hover:bg-slate-900/90 backdrop-blur-xl border border-purple-500/30 hover:border-purple-400/60 shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Contact Us</span>
          </button>
        </div>

        {/* Contact Strip Bar with Clickable Direct Actions */}
        <div className="pointer-events-auto w-full max-w-4xl p-4 sm:p-5 rounded-3xl bg-slate-950/60 backdrop-blur-2xl border border-purple-500/25 shadow-[0_12px_40px_rgba(0,0,0,0.7)] flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Numbers list */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm font-semibold text-slate-300">
            <span className="text-purple-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> Direct Contact:
            </span>
            <div className="flex items-center gap-3">
              <a
                href="tel:+91219694862"
                className="text-white hover:text-purple-300 hover:underline transition-colors px-2.5 py-1 rounded-lg bg-slate-900/70 border border-slate-800"
              >
                +91 219694862
              </a>
              <span className="text-slate-600 font-normal">/</span>
              <a
                href="tel:+917348382816"
                className="text-white hover:text-purple-300 hover:underline transition-colors px-2.5 py-1 rounded-lg bg-slate-900/70 border border-slate-800"
              >
                +91 7348382816
              </a>
            </div>
          </div>

          {/* Clickable Quick Action Buttons */}
          <div className="flex items-center flex-wrap justify-center gap-2 w-full md:w-auto">
            <a
              href="tel:+917348382816"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-purple-600/80 hover:bg-purple-500 border border-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>

            <a
              href="https://wa.me/917348382816?text=Hello%20ANX,%20I%20want%20to%20get%20a%20website%20developed."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900/90 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all hover:scale-105"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-pink-300 bg-pink-950/60 hover:bg-pink-900/80 border border-pink-500/40 shadow-[0_0_15px_rgba(236,72,153,0.2)] transition-all hover:scale-105"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* Highlights Quick Pills */}
        <div className="pointer-events-auto mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full max-w-4xl">
          {[
            { label: "Business Websites", icon: Zap },
            { label: "3D & Premium Websites", icon: Sparkles },
            { label: "Custom Websites", icon: Layers },
            { label: "Budget Friendly", icon: ShieldCheck },
            { label: "Free Demo", icon: ArrowRight },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={onScrollToServices}
              className="p-3 rounded-2xl bg-slate-950/40 hover:bg-slate-900/70 backdrop-blur-md border border-purple-500/15 hover:border-purple-400/40 transition-all text-center flex flex-col items-center justify-center gap-1.5 group cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
            >
              <item.icon className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Scroll indicator */}
        <button
          onClick={onScrollToServices}
          className="pointer-events-auto mt-12 p-2 rounded-full text-slate-400 hover:text-purple-300 transition-colors animate-bounce cursor-pointer"
          aria-label="Scroll to services"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
