import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Heart, ShoppingBag, Eye } from "lucide-react";
import { Product } from "./types";

interface NovaNewArrivalsSliderProps {
  products: Product[];
  onOpenProductModal: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
}

export function NovaNewArrivalsSlider({
  products,
  onOpenProductModal,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}: NovaNewArrivalsSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const newArrivals = products.filter((p) => p.isNewArrival);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="nova-new-arrivals" className="py-20 bg-[#09090b] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Slider Navigation Controls */}
        <div className="flex items-end justify-between mb-10 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Runway Premiere
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-wide font-light">
              NEW ARRIVALS SLIDER
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-light">
              Fresh silhouettes just delivered from our Milan & Paris ateliers.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Previous item"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Next item"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
        >
          {newArrivals.map((product) => {
            const wishlisted = isWishlisted(product.id);

            return (
              <div
                key={product.id}
                onClick={() => onOpenProductModal(product)}
                className="group w-[280px] sm:w-[320px] shrink-0 bg-zinc-950/70 rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between snap-start cursor-pointer shadow-md hover:shadow-xl"
              >
                {/* Image Stage */}
                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/80 border border-amber-400/40 text-amber-300 text-[10px] font-bold tracking-wider uppercase backdrop-blur-md">
                      New Release
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-md cursor-pointer ${
                      wishlisted
                        ? "bg-rose-500 text-white"
                        : "bg-black/60 text-zinc-300 hover:text-white border border-white/10"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-current" : ""}`} />
                  </button>

                  {/* Quick Action Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenProductModal(product);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-white text-xs font-semibold backdrop-blur-md flex items-center justify-center gap-1.5 border border-white/15 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold transition-all shadow-md flex items-center justify-center cursor-pointer"
                      title="Add to bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider mb-1">
                      {product.subtitle}
                    </div>
                    <h3 className="text-sm sm:text-base font-serif text-white font-normal line-clamp-1 group-hover:text-amber-200 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-base font-serif font-bold text-white">
                      ${product.price}
                    </span>
                    <span className="text-xs text-zinc-400 group-hover:text-amber-400 transition-colors font-medium">
                      Select Size →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
