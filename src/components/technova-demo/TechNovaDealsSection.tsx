import React, { useState, useEffect } from "react";
import { Flame, Clock, ShoppingCart, Eye, Heart, Zap, Sparkles } from "lucide-react";
import { ElectronicsProduct } from "./types";

interface TechNovaDealsSectionProps {
  dealProducts: ElectronicsProduct[];
  onQuickView: (product: ElectronicsProduct) => void;
  onAddToCart: (product: ElectronicsProduct) => void;
  onToggleWishlist: (product: ElectronicsProduct) => void;
  wishlistIds: string[];
}

export function TechNovaDealsSection({
  dealProducts,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}: TechNovaDealsSectionProps) {
  // Live countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDigit = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  return (
    <section id="deals" className="py-16 bg-[#06080F] border-b border-cyan-500/15 relative overflow-hidden">
      {/* Subtle fire glow in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Deals Header with Countdown */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/30 via-slate-900/60 to-cyan-950/30 border border-amber-500/30 mb-10 shadow-[0_10px_40px_rgba(0,0,0,0.6)] gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black tracking-widest uppercase">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
              <span>LIMITED TIME FLASH OFFERS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              TODAY'S BEST DEALS
            </h2>
            <p className="text-slate-300 text-sm max-w-xl">
              Special promotional prices on flagship smartphones, 4K Mini-LED displays, and titanium wearables. Guaranteed lowest price this season.
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Deals End In:</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center bg-[#0C101A] border border-amber-500/30 rounded-xl px-3.5 py-2 min-w-[60px] shadow-inner">
                <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                  {formatDigit(timeLeft.hours)}
                </span>
                <span className="text-[9px] uppercase font-bold text-slate-400">Hours</span>
              </div>
              <span className="text-amber-400 font-black text-xl">:</span>
              <div className="flex flex-col items-center bg-[#0C101A] border border-amber-500/30 rounded-xl px-3.5 py-2 min-w-[60px] shadow-inner">
                <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                  {formatDigit(timeLeft.minutes)}
                </span>
                <span className="text-[9px] uppercase font-bold text-slate-400">Mins</span>
              </div>
              <span className="text-amber-400 font-black text-xl">:</span>
              <div className="flex flex-col items-center bg-[#0C101A] border border-amber-500/30 rounded-xl px-3.5 py-2 min-w-[60px] shadow-inner">
                <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                  {formatDigit(timeLeft.seconds)}
                </span>
                <span className="text-[9px] uppercase font-bold text-slate-400">Secs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deals Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const savedAmount = product.originalPrice - product.price;

            return (
              <div
                key={product.id}
                className="group relative rounded-2xl bg-[#0B0F1A] border border-slate-800 hover:border-amber-500/40 p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_15px_35px_rgba(245,158,11,0.15)] transform hover:-translate-y-1"
              >
                {/* Image & Badges */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-[#070A12] mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Discount percentage tag */}
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-amber-500 text-black text-xs font-black tracking-wider flex items-center gap-1 shadow-md">
                    <Zap className="w-3 h-3 fill-black" />
                    <span>SAVE ${savedAmount}</span>
                  </div>

                  {/* Quick View & Wishlist Overlays */}
                  <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onToggleWishlist(product)}
                      className={`p-2 rounded-lg backdrop-blur-md border transition-all cursor-pointer ${
                        isWishlisted
                          ? "bg-rose-600 text-white border-rose-400"
                          : "bg-black/60 text-slate-300 hover:text-white border-white/20 hover:bg-black/80"
                      }`}
                      title="Save to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? "fill-white" : ""}`} />
                    </button>

                    <button
                      onClick={() => onQuickView(product)}
                      className="p-2 rounded-lg bg-black/60 hover:bg-black/80 text-slate-300 hover:text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                      title="Quick View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-2 flex-grow">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-bold text-cyan-400 uppercase tracking-wider">{product.category}</span>
                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                      ★ {product.rating} ({product.reviewsCount})
                    </span>
                  </div>

                  <h3
                    onClick={() => onQuickView(product)}
                    className="text-sm sm:text-base font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer line-clamp-2"
                  >
                    {product.name}
                  </h3>

                  {/* Stock progress */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span className="text-amber-400/90 font-medium">Almost Sold Out</span>
                      <span className="font-bold text-slate-300">Only {product.stockCount || 5} left</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full w-3/4" />
                    </div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-xs text-slate-400 line-through">${product.originalPrice}</div>
                    <div className="text-xl font-black text-white text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
                      ${product.price}
                    </div>
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
