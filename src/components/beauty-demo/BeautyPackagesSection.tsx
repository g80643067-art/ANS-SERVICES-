import React from "react";
import { Sparkles, Check, Crown, ArrowRight } from "lucide-react";
import { BRIDAL_PACKAGES, BridalPackage } from "@/data/beautyDemoData";

interface BeautyPackagesSectionProps {
  onSelectPackageForBooking: (packageName: string) => void;
}

export function BeautyPackagesSection({
  onSelectPackageForBooking,
}: BeautyPackagesSectionProps) {
  return (
    <section id="packages" className="py-20 bg-[#faf6f0] relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#f0e0ce]/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f1dfce] text-[#7d4e32] text-xs font-semibold tracking-widest uppercase">
            <Crown className="w-3.5 h-3.5 text-[#a8744f]" />
            <span>ALL-INCLUSIVE EXPERIENCES</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#231815] font-bold">
            Bridal Makeover Packages
          </h2>

          <p className="text-[#6b5548] text-sm sm:text-base leading-relaxed">
            Thoughtfully packaged experiences incorporating skin preparation, trial consultations,
            couture hairstyling, and complete event touch-up support.
          </p>
        </div>

        {/* 3 Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {BRIDAL_PACKAGES.map((pkg: BridalPackage) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.isPopular
                  ? "bg-gradient-to-b from-[#2d1e17] to-[#1e130e] text-white shadow-[0_20px_50px_rgba(45,30,23,0.3)] border-2 border-[#b88c68] lg:-translate-y-3"
                  : "bg-white text-[#231815] shadow-[0_4px_25px_rgba(40,25,15,0.06)] border border-[#ebdcd0] hover:shadow-[0_12px_35px_rgba(143,94,59,0.12)]"
              }`}
            >
              {/* Popular Badge */}
              {pkg.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#c5a059] text-[#1c120c] text-[11px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-md flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-[#1c120c]" />
                  <span>MOST POPULAR CHOICE</span>
                </div>
              )}

              <div>
                {/* Header info */}
                <div className="border-b pb-6 mb-6 border-current/10">
                  <span
                    className={`text-xs font-bold tracking-wider uppercase block ${
                      pkg.isPopular ? "text-[#f4d4ba]" : "text-[#8f5e3b]"
                    }`}
                  >
                    {pkg.duration}
                  </span>

                  <h3 className="font-serif text-2xl font-bold mt-1">{pkg.name}</h3>

                  <p
                    className={`text-xs mt-2 leading-relaxed ${
                      pkg.isPopular ? "text-[#e0cbba]" : "text-[#786457]"
                    }`}
                  >
                    {pkg.tagline}
                  </p>

                  <div className="mt-5 flex items-baseline gap-2">
                    <span
                      className={`text-3xl sm:text-4xl font-serif font-bold ${
                        pkg.isPopular ? "text-[#f7dfcd]" : "text-[#8f5e3b]"
                      }`}
                    >
                      {pkg.price}
                    </span>
                    {pkg.originalPrice && (
                      <span
                        className={`text-xs line-through ${
                          pkg.isPopular ? "text-[#a38b7a]" : "text-[#a89689]"
                        }`}
                      >
                        {pkg.originalPrice}
                      </span>
                    )}
                  </div>

                  <span
                    className={`block text-[11px] mt-1.5 font-medium ${
                      pkg.isPopular ? "text-[#f4d4ba]/80" : "text-[#8a6a54]"
                    }`}
                  >
                    Ideal for: {pkg.idealFor}
                  </span>
                </div>

                {/* Features list */}
                <div className="space-y-3 mb-8">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider block ${
                      pkg.isPopular ? "text-[#f4d4ba]" : "text-[#5e473a]"
                    }`}
                  >
                    What's Included:
                  </span>

                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          pkg.isPopular
                            ? "bg-[#b88c68] text-[#1c120c]"
                            : "bg-[#f4e6d8] text-[#8f5e3b]"
                        }`}
                      >
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className={pkg.isPopular ? "text-[#ede0d4]" : "text-[#5e4b40]"}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectPackageForBooking(pkg.name)}
                className={`w-full py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                  pkg.isPopular
                    ? "bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-[#1c120c] hover:brightness-110 shadow-[0_4px_20px_rgba(212,175,55,0.4)]"
                    : "bg-[#8f5e3b] text-white hover:bg-[#784e31] shadow-[0_4px_15px_rgba(143,94,59,0.25)]"
                }`}
              >
                <span>Book This Package</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
