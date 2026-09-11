import React from "react";
import { Sparkles, Award, ShieldCheck, Scissors, Leaf, Clock, Globe } from "lucide-react";
import { BRAND_VALUES } from "./clothesData";

export function NovaAboutSection() {
  return (
    <section id="nova-about" className="py-24 bg-[#0a0a0c] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: Story Text */}
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold flex items-center gap-1.5 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              The Atelier Story
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wide font-light leading-tight">
              WHERE CONTEMPORARY EDGES <br />
              <span className="italic font-normal text-amber-300">MEET HEIRLOOM HERITAGE</span>
            </h2>

            <p className="mt-6 text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
              Founded with the conviction that luxury clothing should be both intellectually provoking and physically transcendent, <strong>NOVA WEAR</strong> unites generational artisans from Milan's tailoring houses, Okayama's shuttle-loom denim mills, and Varanasi's master pit-loom weavers.
            </p>

            <p className="mt-4 text-zinc-400 text-sm leading-relaxed font-light">
              We reject seasonal obsolescence. Every garment is drafted with pure geometric balance, weighted draping, and hand-finished French seams created to endure and age with profound character.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-white/10">
              <div>
                <span className="text-3xl sm:text-4xl font-serif font-light text-amber-300 block">
                  100%
                </span>
                <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium">
                  Ethical Certified Fibers
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-serif font-light text-white block">
                  120h+
                </span>
                <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium">
                  Artisanal Needlework
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-serif font-light text-white block">
                  4
                </span>
                <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium">
                  Global Boutiques
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Duo */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop"
                alt="Master tailor cutting wool suit"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] uppercase tracking-widest text-amber-300 font-bold block">
                  Sartorial Craft
                </span>
                <span className="text-xs text-white font-serif">Savile Row Canvas Fitting</span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] border border-white/10 shadow-2xl mt-8">
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop"
                alt="Artisan zardozi embroidery"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] uppercase tracking-widest text-amber-300 font-bold block">
                  Royal Heirloom
                </span>
                <span className="text-xs text-white font-serif">Pure Metallic Zari Needlework</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Brand Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRAND_VALUES.map((val, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-zinc-950/60 border border-white/10 hover:border-amber-400/40 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mb-5">
                {idx === 0 && <Award className="w-5 h-5" />}
                {idx === 1 && <Leaf className="w-5 h-5" />}
                {idx === 2 && <Scissors className="w-5 h-5" />}
                {idx === 3 && <ShieldCheck className="w-5 h-5" />}
              </div>

              <h4 className="text-base font-serif text-white tracking-wide mb-2">
                {val.title}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
