import React from "react";
import { Heart, Quote, Sparkles } from "lucide-react";
import { TESTIMONIALS, Testimonial } from "@/data/beautyDemoData";

export function BeautyTestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-[#fdfcf9] border-t border-[#f0e6dd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4e7dc] text-[#855539] text-xs font-semibold tracking-widest uppercase">
            <Heart className="w-3.5 h-3.5 text-[#b0774c]" />
            <span>WORDS FROM OUR BRIDES</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#231815] font-bold">
            Real Love Stories & Reviews
          </h2>

          <p className="text-[#69554a] text-sm sm:text-base leading-relaxed">
            Read how Beauty Demo helped over 500+ brides feel effortlessly radiant, confident,
            and regal on their special day.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review: Testimonial) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-8 border border-[#ebdcd0] shadow-[0_4px_25px_rgba(40,25,15,0.05)] hover:shadow-[0_12px_35px_rgba(143,94,59,0.1)] transition-all duration-300 flex flex-col justify-between relative"
            >
              <div>
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-[#e3cfbf] mb-4" />

                {/* Rating Icons */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Sparkles key={i} className="w-4 h-4 text-[#8f5e3b]" />
                  ))}
                </div>

                {/* Look Tag */}
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#a4704b] block mb-2">
                  {review.lookTitle}
                </span>

                {/* Review text */}
                <p className="text-xs sm:text-sm text-[#57443a] leading-relaxed italic mb-6">
                  "{review.review}"
                </p>
              </div>

              {/* Author Profile */}
              <div className="pt-4 border-t border-[#f2e6dc] flex items-center gap-3">
                <img
                  src={review.image}
                  alt={review.brideName}
                  className="w-11 h-11 rounded-full object-cover border border-[#ebdcd0]"
                />
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#231815]">
                    {review.brideName}
                  </h3>
                  <p className="text-[11px] text-[#7d685b]">{review.event}</p>
                  <p className="text-[10px] text-[#a48e80]">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
