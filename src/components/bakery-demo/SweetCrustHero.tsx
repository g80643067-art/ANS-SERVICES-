import React from "react";
import { ArrowRight, Cake, Sparkles, Award, ShieldCheck, Heart } from "lucide-react";

interface SweetCrustHeroProps {
  onExploreMenu: () => void;
  onCustomCakes: () => void;
}

export function SweetCrustHero({ onExploreMenu, onCustomCakes }: SweetCrustHeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF3EC] to-[#F5ECE1] py-12 md:py-20 border-b border-[#F0E6D8]">
      {/* Background ambient warm glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E6A15C]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#C67D34]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4E6D6] border border-[#E4D1BD] text-[#9C4A1A] text-xs font-bold tracking-wider uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C67D34]" />
              <span>HANDCRAFTED ARTISAN BAKEHOUSE</span>
            </div>

            {/* Main Heading as requested */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-serif font-black tracking-tight text-[#3C2415] leading-[1.1]">
              FRESHLY BAKED, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C4A1A] via-[#C67D34] to-[#80350A]">
                MADE WITH LOVE
              </span>
            </h1>

            {/* Subtitle as requested */}
            <p className="text-base sm:text-lg text-[#6B5341] max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Delicious cakes, pastries and breads baked fresh every day. Sourcing 100% French Normandy butter, slow-leavened sourdough mother cultures, and single-origin chocolates.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="px-7 py-3.5 rounded-full bg-[#3C2415] text-[#FFFDF9] font-bold text-sm sm:text-base hover:bg-[#9C4A1A] transition-all duration-300 shadow-lg shadow-[#3C2415]/15 hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2.5 cursor-pointer group"
              >
                <span>EXPLORE MENU</span>
                <ArrowRight className="w-4 h-4 text-[#FEE6D0] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onCustomCakes}
                className="px-6 py-3.5 rounded-full bg-white text-[#5A4333] border border-[#DFCBB7] font-semibold text-sm sm:text-base hover:bg-[#FAF3EC] hover:text-[#9C4A1A] hover:border-[#C67D34] transition-all duration-300 shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Cake className="w-4 h-4 text-[#C67D34]" />
                <span>CUSTOM CAKES</span>
              </button>
            </div>

            {/* 3 Pillars Trust Points */}
            <div className="pt-6 border-t border-[#EBDDCE] grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F5ECE1] flex items-center justify-center text-[#9C4A1A] shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#3C2415]">AOP Butter</h4>
                  <p className="text-[11px] text-[#806956]">100% French cream</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F5ECE1] flex items-center justify-center text-[#9C4A1A] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#3C2415]">Slow Leavened</h4>
                  <p className="text-[11px] text-[#806956]">48-hr fermentation</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F5ECE1] flex items-center justify-center text-[#9C4A1A] shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#3C2415]">No Chemicals</h4>
                  <p className="text-[11px] text-[#806956]">Pure & natural</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            {/* Featured Image Composite Card */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#C67D34]/30 via-[#E6A15C]/20 to-[#9C4A1A]/30 blur-lg transform -rotate-1" />

              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-[#3C2415]/20 bg-[#2D1B10]">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop"
                  alt="Artisan Chocolate Truffle Cake & Bakes"
                  referrerPolicy="no-referrer"
                  className="w-full h-[380px] sm:h-[460px] object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#20130B]/90 via-[#20130B]/20 to-transparent pointer-events-none" />

                {/* Floating Highlights on Image */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#FDF8F3] text-xs font-semibold border border-white/20 shadow-md">
                    <Sparkles className="w-3 h-3 text-[#E6A15C]" />
                    Today's Masterpiece
                  </span>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#F0E6D8] shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#9C4A1A]">
                        Signature Patisserie
                      </span>
                      <h3 className="text-base font-serif font-bold text-[#3C2415]">
                        Dark Belgian Truffle Gateau
                      </h3>
                      <p className="text-xs text-[#705846]">
                        Baked fresh at dawn with 70% dark chocolate
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#8A7565] line-through block">$45.00</span>
                      <span className="text-lg font-black text-[#9C4A1A]">$38.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Pill: 5:00 AM Oven Bake */}
              <div className="absolute -bottom-4 -left-4 sm:left-6 px-4 py-2.5 rounded-2xl bg-[#3C2415] text-[#FFFDF9] shadow-xl border border-[#5A3821] flex items-center gap-2.5 z-20">
                <div className="w-8 h-8 rounded-xl bg-[#E6A15C] text-[#3C2415] flex items-center justify-center font-black text-xs">
                  5 AM
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white leading-tight">First Oven Batch</p>
                  <p className="text-[9px] text-[#D8C7B5]">Golden & warm daily</p>
                </div>
              </div>

              {/* Floating Pill: Customer Rating */}
              <div className="absolute -top-3 -right-3 px-3.5 py-2 rounded-2xl bg-white text-[#3C2415] shadow-xl border border-[#F0E6D8] flex items-center gap-2 z-20">
                <span className="text-amber-500 font-black text-sm">★ 4.9</span>
                <span className="text-[11px] font-semibold text-[#5A4333]">1,200+ Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
