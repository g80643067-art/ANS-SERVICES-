import React from "react";
import { Sparkles, Heart, Award, ShieldCheck, Sun } from "lucide-react";

export function SweetCrustAboutUs() {
  const pillars = [
    {
      icon: <Sun className="w-5 h-5 text-[#C67D34]" />,
      title: "Dawn Stone Baking",
      desc: "Our bakers arrive at 4:30 AM every morning to hand-shape and stone-bake every loaf and viennoiserie.",
    },
    {
      icon: <Award className="w-5 h-5 text-[#C67D34]" />,
      title: "French Normandy Butter",
      desc: "We exclusively use 84% butterfat French AOP butter for incomparably crisp, golden laminated pastry layers.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#C67D34]" />,
      title: "48-Hour Wild Ferment",
      desc: "Our sourdough starter 'Eve' has been nurtured for 12 years, yielding complex aromatics and easy digestion.",
    },
    {
      icon: <Heart className="w-5 h-5 text-[#C67D34]" />,
      title: "Zero Preservatives",
      desc: "Pure stoneground organic flours, whole eggs, natural vanilla pods, and sea salt. Nothing artificial ever.",
    },
  ];

  return (
    <section id="about-us" className="py-20 bg-[#FAF3EC]/70 border-b border-[#F0E6D8] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute -top-10 -left-10 w-96 h-96 bg-[#C67D34]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Story Mosaic */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-[#2D1B10]">
              <img
                src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1000&auto=format&fit=crop"
                alt="Master Baker hand-dusting sourdough dough with organic flour"
                referrerPolicy="no-referrer"
                className="w-full h-[450px] sm:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#20130B]/90 via-[#20130B]/20 to-transparent" />

              {/* Bottom Quote Banner */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#DFCBB7] shadow-xl">
                <p className="font-serif italic text-sm sm:text-base text-[#3C2415] leading-relaxed">
                  "True baking is patience, touch, and respect for natural time. When you pull a crackling sourdough loaf or a golden croissant from the stone deck, you taste the labor of love."
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#9C4A1A]">
                    — Chef Laurent & Helene Duval
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8A7565]">
                    Founding Master Bakers
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -top-4 -left-4 px-4 py-3 rounded-2xl bg-[#3C2415] text-white shadow-xl border border-[#5A3821] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E6A15C] text-[#3C2415] font-black text-lg flex items-center justify-center">
                12
              </div>
              <div>
                <p className="text-xs font-black leading-tight">Years of Artisan</p>
                <p className="text-[10px] text-[#D8C7B5]">Bakehouse Tradition</p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Story & Quality Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4E6D6] text-[#9C4A1A] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C67D34]" />
              <span>THE SWEET CRUST HERITAGE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-[#3C2415] leading-tight">
              Flour, Water, Salt & <br />
              <span className="text-[#9C4A1A]">Patience Since 2014</span>
            </h2>

            <p className="text-sm sm:text-base text-[#6B5341] leading-relaxed">
              Sweet Crust was born out of a quiet morning obsession: recreating the profound, unforgettable crunch of authentic Parisian viennoiserie and rustic European sourdough. We rejected industrial mixes and commercial shortcuts from day one.
            </p>

            <p className="text-sm sm:text-base text-[#6B5341] leading-relaxed">
              Every single croissant undergoes a deliberate 72-hour lamination with 27 micro-layers of French churned butter. Our sourdoughs ferment gently for two full days in cold wicker bannetons, developing unmatched depth of flavor and crisp mahogany ears.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {pillars.map((pillar, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white border border-[#EADBCE] shadow-2xs hover:border-[#C67D34] transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#FAF3EC] flex items-center justify-center mb-2.5">
                    {pillar.icon}
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#3C2415] mb-1">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[#7A6453] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
