import React from "react";
import { Sparkles, Users, Award, ShieldCheck, HeartHandshake, CheckCircle2 } from "lucide-react";

export function BeautyWhyChooseUsSection() {
  const reasons = [
    {
      icon: Users,
      title: "Master Certified Artists",
      tagline: "10+ Years Couture Experience",
      desc: "Our bridal team is trained under international celebrity artists with expertise in contouring diverse skin tones, eye shapes, and bridal traditions.",
    },
    {
      icon: ShieldCheck,
      title: "100% Authentic Luxury Cosmetics",
      tagline: "Dior, MAC, Charlotte Tilbury & Huda",
      desc: "We exclusively utilize sealed, high-grade dermatologically tested products guaranteeing non-comedogenic, 18-hour waterproof longevity with zero flashback in photos.",
    },
    {
      icon: Sparkles,
      title: "Personalized Bridal Architecture",
      tagline: "Tailored to Your Outfit & Lighting",
      desc: "Every bride receives a tailored digital moodboard harmonizing your lehenga shades, heirloom jewelry, venue lighting, and natural undertones.",
    },
    {
      icon: HeartHandshake,
      title: "Dedicated Pre-Wedding Trials",
      tagline: "Zero Surprises on Your Wedding Day",
      desc: "Experience a complete pre-wedding trial session where we test lash styles, hairstyle angles, and lipstick shades until you feel 100% confident.",
    },
  ];

  const cosmeticBrands = [
    "DIOR BACKSTAGE",
    "CHARLOTTE TILBURY",
    "M·A·C COSMETICS",
    "HUDA BEAUTY",
    "ESTÉE LAUDER",
    "TEMPTU PRO AIRBRUSH",
    "ANASTASIA BEVERLY HILLS",
    "NARS",
  ];

  return (
    <section id="why-us" className="py-20 bg-[#faf6f0] border-t border-[#f0e6dd] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f1dfce] text-[#7d4e32] text-xs font-semibold tracking-widest uppercase">
            <Award className="w-3.5 h-3.5 text-[#a8744f]" />
            <span>THE BEAUTY DEMO PROMISE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#231815] font-bold">
            Why Brides Trust Beauty Demo
          </h2>

          <p className="text-[#6b5548] text-sm sm:text-base leading-relaxed">
            Your wedding is a once-in-a-lifetime milestone. Here is how our commitment to excellence,
            hygiene, and artistry transforms your bridal experience.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-[#ebdcd0] shadow-[0_4px_20px_rgba(40,25,15,0.04)] hover:shadow-[0_12px_30px_rgba(143,94,59,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#f4e6d8] flex items-center justify-center text-[#8f5e3b] mb-6 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#a4704b] block mb-1">
                    {reason.tagline}
                  </span>

                  <h3 className="font-serif text-lg font-bold text-[#231815] mb-2">
                    {reason.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#614e42] leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Luxury Brand Partners Marquee */}
        <div className="bg-white rounded-2xl p-8 border border-[#ebdcd0] shadow-sm text-center">
          <span className="text-xs font-bold tracking-widest text-[#8a6e5b] uppercase block mb-6">
            LUXURY COSMETIC BRANDS IN OUR BRIDAL KIT
          </span>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-semibold tracking-wider text-[#735d4f]">
            {cosmeticBrands.map((brand, i) => (
              <div
                key={i}
                className="px-4 py-2 rounded-xl bg-[#faf6f0] border border-[#f0e4d8] text-[#543f32] font-serif tracking-widest uppercase hover:text-[#8f5e3b] transition-colors"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
