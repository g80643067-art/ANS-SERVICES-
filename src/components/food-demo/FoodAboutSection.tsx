import React from "react";
import {
  Sparkles,
  Flame,
  ShieldCheck,
  Award,
  Heart,
  ChefHat,
  Leaf,
  Clock,
} from "lucide-react";

export function FoodAboutSection() {
  const pillars = [
    {
      title: "100% Fresh Daily Sourcing",
      desc: "Every vegetable, paneer block, and chicken cut is sourced fresh every single morning. We never use pre-frozen processed patties.",
      icon: Leaf,
      color: "text-emerald-400 bg-emerald-950/80 border-emerald-500/30",
    },
    {
      title: "Secret Hand-Ground Spices",
      desc: "Our proprietary 18-spice tandoori and chaat masala blend is roasted and ground in-house for that unforgettable authentic aroma.",
      icon: Flame,
      color: "text-amber-400 bg-amber-950/80 border-amber-500/30",
    },
    {
      title: "Pocket-Friendly Pricing",
      desc: "We believe gourmet street food should be accessible to everyone. Generous portions, premium quality, and zero inflated markups.",
      icon: Award,
      color: "text-orange-400 bg-orange-950/80 border-orange-500/30",
    },
    {
      title: "Hygienic Open Kitchen",
      desc: "Prepared right before your eyes with strict sanitization, 100% pure butter/desi ghee, and top-tier food safety standards.",
      icon: ShieldCheck,
      color: "text-blue-400 bg-blue-950/80 border-blue-500/30",
    },
  ];

  return (
    <section id="food-about" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl p-8 sm:p-12 lg:p-16 bg-zinc-950 border border-zinc-800 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wider uppercase mb-4">
              <ChefHat className="w-3.5 h-3.5 text-amber-400" />
              <span>Our Food Story</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-6">
              Born On The Streets,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
                Perfected For Foodies.
              </span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
              What started as a passionate street food cart in the bustling night food lanes has grown into a destination for true flavor seekers. We take iconic Indian street food classics — from spicy Kolkata Kathi rolls and Kurkure fried momos to charcoal tandoori smash burgers — and cook them with uncompromising freshness and love.
            </p>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-xl flex-shrink-0">
                🔥
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">The Desi Crave Promise</h4>
                <p className="text-xs text-zinc-400">
                  Real butter, freshly chopped greens, in-house spicy sauces, and always served piping hot.
                </p>
              </div>
            </div>
          </div>

          {/* Right 4 Pillars Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-amber-500/30 transition-all hover:bg-zinc-900 group"
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center border mb-4 group-hover:scale-110 transition-transform ${p.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
