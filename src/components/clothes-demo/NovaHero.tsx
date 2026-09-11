import React from "react";
import { ArrowRight, Sparkles, ShieldCheck, Compass, Award } from "lucide-react";
import { ProductCategory } from "./types";

interface NovaHeroProps {
  onExploreClick: () => void;
  onViewLookbook: () => void;
  onSelectCategory: (category: ProductCategory) => void;
}

export function NovaHero({
  onExploreClick,
  onViewLookbook,
  onSelectCategory,
}: NovaHeroProps) {
  return (
    <section id="nova-hero" className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0a0a0c]">
      {/* Background Image with Cinematic Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=85&w=2000&auto=format&fit=crop"
          alt="Nova Wear Runway Couture Collection"
          className="w-full h-full object-cover object-center opacity-40 scale-105 filter brightness-90 animate-pulse duration-1000"
          style={{ animationDuration: "12s" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/65 to-[#0a0a0c]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12),transparent_70%)]" />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Season Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs uppercase tracking-[0.3em] font-semibold mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.15)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Autumn / Winter Runway '26 Capsule</span>
        </div>

        {/* Main Display Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-[0.08em] font-light text-white leading-[1.08] mb-6">
          SCULPTED <br />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300">
            TIMELESS ELEGANCE
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed font-light mb-10 text-balance">
          Bridging the architectural precision of Milanese tailoring with boundary-pushing contemporary streetwear and regal hand-woven heirloom silks.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <button
            onClick={onExploreClick}
            id="nova-hero-explore-btn"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_35px_rgba(245,158,11,0.4)] hover:shadow-[0_0_45px_rgba(245,158,11,0.6)] flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onViewLookbook}
            id="nova-hero-lookbook-btn"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-amber-400/50 rounded-full font-semibold text-xs uppercase tracking-widest transition-all backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>View Editorial Lookbook</span>
          </button>
        </div>

        {/* 4 Category Quick Launch Pills */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
          {[
            { label: "Women Couture", cat: "Women" as ProductCategory },
            { label: "Men's Sartorial", cat: "Men" as ProductCategory },
            { label: "Urban Streetwear", cat: "Streetwear" as ProductCategory },
            { label: "Regal Ethnic Wear", cat: "Ethnic Wear" as ProductCategory },
          ].map((item) => (
            <button
              key={item.cat}
              onClick={() => onSelectCategory(item.cat)}
              className="px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 hover:border-amber-400/40 text-zinc-300 hover:text-white text-xs font-medium tracking-wider transition-all backdrop-blur-sm cursor-pointer text-center hover:bg-white/5"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Floating Value Banner */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/60 backdrop-blur-md py-4 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-around text-xs tracking-wider text-zinc-300">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Master European & Asian Artisans</span>
          </div>
          <div className="w-[1px] h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Complimentary Worldwide Delivery</span>
          </div>
          <div className="w-[1px] h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>100% Certified Sustainable Fibers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
