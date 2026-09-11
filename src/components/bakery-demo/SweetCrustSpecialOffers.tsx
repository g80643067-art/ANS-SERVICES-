import React, { useState } from "react";
import { SPECIAL_OFFERS, SpecialOfferItem } from "./bakeryData";
import { Sparkles, Tag, Check, ArrowRight } from "lucide-react";

interface SweetCrustSpecialOffersProps {
  onClaimOffer: (offer: SpecialOfferItem) => void;
}

export function SweetCrustSpecialOffers({ onClaimOffer }: SweetCrustSpecialOffersProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  return (
    <section id="special-offers" className="py-16 bg-[#3C2415] text-white relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9C4A1A]/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C67D34]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Promotional Banner Header as requested */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5A3821] border border-[#7A4E31] text-[#E6A15C] text-xs font-black tracking-widest uppercase mb-4 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#E6A15C]" />
            <span>LIMITED TIME PROMOTIONS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-[#FFFDF9] leading-tight">
            FRESH BAKES • SPECIAL OFFERS • EVERY DAY
          </h2>
          <div className="w-20 h-1 bg-[#E6A15C] rounded-full mx-auto mt-4 mb-3" />
          <p className="text-sm sm:text-base text-[#D8C7B5]">
            Handpicked breakfast bundles, celebration packs, and afternoon tea combos baked fresh every sunrise.
          </p>
        </div>

        {/* 3 Special Offers Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPECIAL_OFFERS.map((offer) => (
            <div
              key={offer.id}
              className="bg-[#2D1B10] rounded-3xl overflow-hidden border border-[#52331E] flex flex-col justify-between hover:border-[#E6A15C] transition-all duration-300 shadow-xl group hover:-translate-y-1"
            >
              {/* Image & Discount Badge */}
              <div className="relative h-48 w-full overflow-hidden bg-black/40">
                <img
                  src={offer.image}
                  alt={offer.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B10] via-transparent to-black/40" />

                {/* Badges */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-[#E6A15C] text-[#3C2415] text-xs font-black uppercase tracking-wider shadow-md">
                    {offer.discount}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#FFFDF9] text-[10px] font-bold border border-white/20">
                    {offer.badge}
                  </span>
                </div>
              </div>

              {/* Offer Details */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-serif font-bold text-xl text-white group-hover:text-[#E6A15C] transition-colors">
                      {offer.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#D8C7B5] leading-relaxed mb-4">
                    {offer.subtitle}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-1.5 mb-5">
                    {offer.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-[#C5B3A1]">
                        <Check className="w-3.5 h-3.5 text-[#E6A15C] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price, Promo Code & Claim CTA */}
                <div className="pt-4 border-t border-[#442918] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#8A7565] line-through block">
                        {offer.originalPrice}
                      </span>
                      <span className="text-2xl font-black text-[#E6A15C]">
                        {offer.price}
                      </span>
                    </div>

                    {/* Copy Coupon Code Button */}
                    <button
                      onClick={() => handleCopyCode(offer.code)}
                      className="px-3 py-1.5 rounded-lg bg-[#3C2415] border border-[#643E25] hover:border-[#E6A15C] text-xs text-[#D8C7B5] hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Click to copy coupon code"
                    >
                      <Tag className="w-3 h-3 text-[#E6A15C]" />
                      <span className="font-mono font-bold text-white">{offer.code}</span>
                      {copiedCode === offer.code && (
                        <span className="text-[10px] text-emerald-400 font-bold">Copied!</span>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => onClaimOffer(offer)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C67D34] to-[#9C4A1A] text-white font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <span>Claim Offer & Add to Basket</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
