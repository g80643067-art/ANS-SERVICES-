import React from "react";
import { Sparkles, Calendar, Award, Star, ShieldCheck, Heart, ArrowRight } from "lucide-react";
import { SALON_STATS } from "@/data/beautyDemoData";

interface BeautyHeroProps {
  onOpenBooking: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export function BeautyHero({ onOpenBooking, onScrollToSection }: BeautyHeroProps) {
  return (
    <section id="hero" className="relative bg-[#faf8f5] overflow-hidden pt-8 pb-16 lg:py-20">
      {/* Decorative ambient gold glow */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#f4e4d4]/60 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#eadecd]/50 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Crown / Luxury Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3e7dc] border border-[#e2cdbe] text-[#784e35] text-xs font-semibold tracking-widest uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#b0774c]" />
              <span>PREMIER BRIDAL ARTISTRY & SALON</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#231815] font-normal leading-[1.15] tracking-tight">
              Your Dream <br />
              <span className="italic font-light text-[#8f5e3b] font-serif">Bridal Look</span> Starts Here.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#5e4b40] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Bespoke haute couture makeup, radiant HD airbrush artistry, and exquisite hair styling
              crafted specifically for your skin, your jewelry, and the most memorable day of your life.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#8f5e3b] to-[#b37a51] hover:from-[#7a4e2f] hover:to-[#9c6640] text-white font-medium text-sm tracking-wide uppercase px-8 py-4 rounded-full shadow-[0_8px_25px_rgba(143,94,59,0.35)] hover:shadow-[0_12px_30px_rgba(143,94,59,0.45)] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Your Bridal Consultation</span>
              </button>

              <button
                onClick={() => onScrollToSection("packages")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#f6eee7] text-[#4a362a] font-medium text-sm px-7 py-4 rounded-full border border-[#d8c5b5] shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <span>View Bridal Packages</span>
                <ArrowRight className="w-4 h-4 text-[#8f5e3b]" />
              </button>
            </div>

            {/* Trust Pill Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#6e584a]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8f5e3b]" />
                <span className="font-medium">100% Authentic Luxury Cosmetics</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#8f5e3b]" />
                <span className="font-medium">Master Certified Artists</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#8f5e3b]" />
                <span className="font-medium">Pre-Wedding Trials Available</span>
              </div>
            </div>
          </div>

          {/* Right Visual Image Card with Floating Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative gold frame */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#dcc0a8] via-[#eedbc9] to-[#fcf7f2] opacity-70 blur-[2px] -z-10" />

              {/* Main Bridal Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(40,25,15,0.18)] border-2 border-white/80 aspect-[4/5] bg-[#2d1e17]">
                <img
                  src="/assets/bridal_hero_banner.jpg"
                  onError={(e) => {
                    // Fallback to high-res bridal image if asset takes time
                    (e.currentTarget as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop";
                  }}
                  alt="Stunning Royal Indian Bride with Radiant Makeup"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

                {/* Bottom Card Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/60 shadow-lg text-[#231815]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold tracking-wider text-[#996542] uppercase block">
                        Couture Masterpiece
                      </span>
                      <h3 className="font-serif text-base font-bold text-[#231815]">
                        The Royal Heritage Bridal
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 bg-[#faede2] px-2.5 py-1 rounded-full text-xs font-bold text-[#8f5e3b]">
                      <Star className="w-3.5 h-3.5 fill-[#8f5e3b] text-[#8f5e3b]" />
                      <span>5.0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Top-Left Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-[#ebdcd0] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f4e6d8] flex items-center justify-center text-[#8f5e3b]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#231815]">HD & Airbrush</span>
                  <span className="block text-[10px] text-[#735d4f]">18-Hour Waterproof</span>
                </div>
              </div>

              {/* Floating Bottom-Right Badge */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-[#ebdcd0] flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    alt="Happy Bride"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    alt="Happy Bride"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=120&auto=format&fit=crop"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    alt="Happy Bride"
                  />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#231815]">500+ Brides</span>
                  <span className="block text-[10px] text-[#735d4f]">Styled in 2025-26</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Stats Bar */}
        <div className="mt-16 pt-8 border-t border-[#ebdcd0] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {SALON_STATS.map((stat, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/60 border border-[#f0e4d8] shadow-sm">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#8f5e3b]">
                {stat.value}
              </span>
              <span className="block text-xs font-bold text-[#2b1e19] mt-1">{stat.label}</span>
              <span className="block text-[11px] text-[#7d685b] mt-0.5">{stat.subtext}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
