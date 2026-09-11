import React from "react";
import streetFoodPosterImg from "../../assets/images/street_food_demo_1789148647372.jpg";
import {
  Flame,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Star,
  Clock,
  ShieldCheck,
  Phone,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

interface FoodHeroProps {
  onExploreMenu: () => void;
  onOrderNow: () => void;
}

export function FoodHero({ onExploreMenu, onOrderNow }: FoodHeroProps) {
  return (
    <section id="food-hero" className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background warm ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-amber-600/15 via-orange-600/10 to-red-600/10 blur-[130px] pointer-events-none -z-10" />

      {/* Main Hero Showcase Card */}
      <div className="relative rounded-3xl overflow-hidden bg-zinc-950/80 border border-zinc-800 shadow-[0_20px_70px_rgba(0,0,0,0.9)] p-6 sm:p-8 lg:p-12 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Content (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Status pills */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>DESI CRAVE STREET FOOD</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Kitchen Open Now</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-900 text-zinc-300 border border-zinc-800">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <strong className="text-white">4.9</strong> (1.2k+ Reviews)
              </span>
            </div>

            {/* Main Catchy Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-5">
              “Authentic Street Food.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                Full of Flavour.”
              </span>
            </h1>

            {/* Short Description */}
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-xl mb-8 font-normal">
              Freshly sizzled crisp smash burgers, fiery steamed momos with garlic-chili dip, stone-baked desi street pizzas, and loaded volcano fries. Made fresh to order with secret hand-ground spices.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8">
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm sm:text-base font-extrabold text-zinc-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-300 shadow-[0_0_30px_rgba(245,158,11,0.45)] hover:shadow-[0_0_45px_rgba(245,158,11,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-4 h-4 text-zinc-950" />
              </button>

              <button
                onClick={onOrderNow}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm sm:text-base font-extrabold text-white bg-zinc-900/90 hover:bg-zinc-800 border border-amber-500/30 hover:border-amber-400/60 shadow-lg hover:shadow-[0_0_25px_rgba(245,158,11,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>Order Now</span>
              </button>
            </div>

            {/* Quick Guarantees bar */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-md pt-4 border-t border-zinc-800/80 text-left">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>25 Mins</span>
                </div>
                <div className="text-[10px] text-zinc-400 mt-0.5">Fast Delivery</div>
              </div>

              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Fresh</span>
                </div>
                <div className="text-[10px] text-zinc-400 mt-0.5">Daily Prep</div>
              </div>

              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-orange-400" />
                  <span>₹99 Onwards</span>
                </div>
                <div className="text-[10px] text-zinc-400 mt-0.5">Pocket Friendly</div>
              </div>
            </div>
          </div>

          {/* Right Featured Image Showcase (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full rounded-3xl overflow-hidden border border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.25)] group">
              {/* The exact featured image */}
              <img
                src={streetFoodPosterImg}
                alt="Street Food Demo Hero"
                className="w-full h-auto object-cover rounded-3xl group-hover:scale-[1.02] transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = "/street_food_poster.jpg";
                }}
              />

              {/* Floating Quick Order overlay chip */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Flame className="w-4 h-4 fill-amber-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Street Crave Specials</span>
                    <span className="text-[10px] text-amber-300">Burgers • Momos • Pizza • Rolls</span>
                  </div>
                </div>

                <button
                  onClick={onExploreMenu}
                  className="px-3 py-1.5 rounded-lg text-xs font-extrabold bg-amber-400 hover:bg-amber-300 text-zinc-950 transition-colors"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
