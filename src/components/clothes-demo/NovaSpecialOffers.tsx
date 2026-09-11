import React, { useState, useEffect } from "react";
import { Sparkles, Copy, Check, Clock, Gift, Scissors, Truck, ArrowRight } from "lucide-react";

interface NovaSpecialOffersProps {
  onShopOffers: () => void;
}

export function NovaSpecialOffers({ onShopOffers }: NovaSpecialOffersProps) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 18, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText("NOVA25");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="nova-offers" className="py-20 bg-[#0c0c0e] relative overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Banner Card */}
        <div className="rounded-3xl bg-gradient-to-r from-zinc-950 via-[#141418] to-zinc-950 border border-amber-400/30 p-8 sm:p-12 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: Offer details */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Runway Private Privilege</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wide font-light leading-tight">
                THE VIP ATELIER EVENT: <br />
                <span className="italic font-normal text-amber-300">25% OFF YOUR ENTIRE WARDROBE</span>
              </h2>

              <p className="mt-4 text-zinc-300 text-sm sm:text-base font-light max-w-xl leading-relaxed">
                Enjoy exclusive client privileges across our new Autumn/Winter couture collection, Japanese selvedge denim, and pure Banarasi heirloom weaves.
              </p>

              {/* Promo Code & Action */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center bg-black/60 border border-amber-400/40 rounded-2xl p-1.5 pl-4 backdrop-blur-md">
                  <div className="mr-3">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-400 block font-semibold">
                      Exclusive Promo Code
                    </span>
                    <span className="text-lg font-mono font-bold text-amber-300 tracking-wider">
                      NOVA25
                    </span>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-zinc-950" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-950" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={onShopOffers}
                  className="px-8 py-3.5 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2 cursor-pointer group"
                >
                  <span>Shop VIP Event</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Col: Live Countdown Clock Box */}
            <div className="lg:col-span-5 bg-black/50 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md text-center">
              <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold mb-6">
                <Clock className="w-4 h-4" />
                <span>Privilege Window Closes In</span>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
                <div className="bg-zinc-900/90 border border-white/10 rounded-xl p-3 sm:p-4">
                  <span className="text-3xl sm:text-4xl font-mono font-light text-white block">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400">Hours</span>
                </div>
                <div className="bg-zinc-900/90 border border-white/10 rounded-xl p-3 sm:p-4">
                  <span className="text-3xl sm:text-4xl font-mono font-light text-white block">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400">Minutes</span>
                </div>
                <div className="bg-zinc-900/90 border border-white/10 rounded-xl p-3 sm:p-4">
                  <span className="text-3xl sm:text-4xl font-mono font-light text-amber-400 block">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400">Seconds</span>
                </div>
              </div>

              <p className="text-xs text-zinc-400 font-light">
                *Applies automatically to all qualifying orders at checkout. Valid online & at flagship boutiques.
              </p>
            </div>
          </div>

          {/* 3 Secondary Luxury Perks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-10 border-t border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Silk Garment Bag & Hanger</h4>
                <p className="text-xs text-zinc-400 mt-1 font-light">
                  Complimentary archival breathable garment dust bag included with all tailored coats and gowns.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Bespoke Alteration Credit</h4>
                <p className="text-xs text-zinc-400 mt-1 font-light">
                  Receive up to $100 complimentary alteration credits redeemable with any accredited tailor.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">White Glove Express Courier</h4>
                <p className="text-xs text-zinc-400 mt-1 font-light">
                  Direct insured personal courier delivery in signature luxury matte black magnetic keepsake boxes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
