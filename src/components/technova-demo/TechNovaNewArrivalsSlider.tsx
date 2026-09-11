import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles, ShoppingCart, Eye, Heart } from "lucide-react";
import { ElectronicsProduct } from "./types";

interface TechNovaNewArrivalsSliderProps {
  newArrivalProducts: ElectronicsProduct[];
  onQuickView: (product: ElectronicsProduct) => void;
  onAddToCart: (product: ElectronicsProduct) => void;
  onToggleWishlist: (product: ElectronicsProduct) => void;
  wishlistIds: string[];
}

export function TechNovaNewArrivalsSlider({
  newArrivalProducts,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}: TechNovaNewArrivalsSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <section id="new-arrivals" className="py-16 bg-[#080A12] border-b border-cyan-500/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Nav Arrows */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest text-cyan-400 uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>JUST RELEASED HARDWARE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              NEW ARRIVALS
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={scrollLeft}
              className="p-3 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer shadow-md"
              aria-label="Previous Slides"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="p-3 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer shadow-md"
              aria-label="Next Slides"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Slider */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {newArrivalProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);

            return (
              <div
                key={product.id}
                className="snap-start flex-shrink-0 w-[290px] sm:w-[320px] rounded-2xl bg-[#0D121F] border border-slate-800 hover:border-cyan-500/40 p-4 flex flex-col justify-between transition-all duration-300 group hover:shadow-[0_15px_30px_rgba(6,182,212,0.15)] transform hover:-translate-y-1"
              >
                {/* Image & Badges */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-[#090C16] mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-black tracking-wider uppercase shadow-md">
                    NEW ARRIVAL
                  </div>

                  {/* Actions */}
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
                      title="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 flex-grow">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-bold text-cyan-400 uppercase tracking-wider">{product.category}</span>
                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                      ★ {product.rating}
                    </span>
                  </div>

                  <h3
                    onClick={() => onQuickView(product)}
                    className="text-sm sm:text-base font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer line-clamp-2"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price and Cart */}
                <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div>
                    {product.originalPrice > product.price && (
                      <div className="text-[11px] text-slate-400 line-through">${product.originalPrice}</div>
                    )}
                    <div className="text-lg font-black text-white">
                      ${product.price}
                    </div>
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-cyan-600 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-slate-700 hover:border-cyan-500"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
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
