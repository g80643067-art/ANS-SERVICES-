import React from "react";
import {
  Sparkles,
  Zap,
  Target,
  Clock,
  Shield,
  Layers,
  PhoneCall,
  CheckCircle,
} from "lucide-react";

interface AboutSectionProps {
  onOpenDemo: () => void;
}

export function AboutSection({ onOpenDemo }: AboutSectionProps) {
  const pillars = [
    {
      title: "Custom Tailoring",
      desc: "Every line of code and visual component is shaped strictly around your target audience and conversion goals.",
      icon: Target,
    },
    {
      title: "Budget Optimization",
      desc: "We eliminate unnecessary agency overhead to offer enterprise-grade web development at fair, accessible rates.",
      icon: Zap,
    },
    {
      title: "High Performance",
      desc: "Lightning-fast initial load times with responsive layouts optimized for mobile, tablet, and high-DPI displays.",
      icon: Clock,
    },
    {
      title: "End-to-End Delivery",
      desc: "From interactive live previews to production deployment and direct ongoing developer support.",
      icon: Shield,
    },
  ];

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl p-8 sm:p-12 lg:p-16 bg-slate-950/70 backdrop-blur-2xl border border-purple-500/25 shadow-[0_20px_60px_rgba(0,0,0,0.8)] pointer-events-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-wider uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>About ANX</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              We Craft Premium Websites That Make You{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400">
                Impossible To Ignore.
              </span>
            </h2>

            <p className="text-slate-300 text-base leading-relaxed mb-8">
              At ANX, we believe exceptional web design shouldn't require an astronomical budget. We combine modern WebGL physics, luxury typography, and bespoke functionality so you get a website that feels ultra-premium, loads instantly, and converts visitors into loyal clients.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenDemo}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Request Free Demo</span>
                <Sparkles className="w-4 h-4" />
              </button>

              <a
                href="tel:+917348382816"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-purple-400" />
                <span>Talk to Us</span>
              </a>
            </div>
          </div>

          {/* Right Feature Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/50 border border-purple-500/15 hover:border-purple-400/40 transition-all hover:bg-slate-900/80 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 group-hover:text-purple-300 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
