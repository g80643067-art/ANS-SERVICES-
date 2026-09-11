import React, { useState } from "react";
import {
  Heart,
  Eye,
  ShoppingBag,
  Star,
  SlidersHorizontal,
  Sparkles,
  Check,
  Search,
  RotateCcw
} from "lucide-react";
import { Product, ProductCategory } from "./types";

interface NovaProductGridProps {
  products: Product[];
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenProductModal: (product: Product) => void;
  onAddToCart: (product: Product, size?: string, colorHex?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
}

export function NovaProductGrid({
  products,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenProductModal,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}: NovaProductGridProps) {
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const categories: ProductCategory[] = [
    "All",
    "Women",
    "Men",
    "Streetwear",
    "Ethnic Wear",
    "New Arrivals",
  ];

  // Filtering
  let filtered = products.filter((p) => {
    // Category check
    if (activeCategory === "New Arrivals") {
      if (!p.isNewArrival) return false;
    } else if (activeCategory !== "All") {
      if (p.category !== activeCategory) return false;
    }

    // Search query check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchSubtitle = p.subtitle.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchTag = p.tag?.toLowerCase().includes(q);
      if (!matchName && !matchSubtitle && !matchDesc && !matchCat && !matchTag) {
        return false;
      }
    }

    return true;
  });

  // Sorting
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    // default featured
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return 0;
  });

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1800);
  };

  return (
    <section id="nova-products" className="py-20 bg-[#0d0d0f] relative min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/10 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Runway Ready Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-wide font-light">
              FEATURED PIECES
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-light">
              Showing {filtered.length} bespoke pieces handcrafted with exceptional materials.
            </p>
          </div>

          {/* Filter & Sort Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-zinc-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white font-medium outline-none cursor-pointer text-xs"
              >
                <option value="featured" className="bg-zinc-900 text-white">Featured Selection</option>
                <option value="price-asc" className="bg-zinc-900 text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-zinc-900 text-white">Price: High to Low</option>
                <option value="rating" className="bg-zinc-900 text-white">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 shadow-[0_0_20px_rgba(245,158,11,0.3)] font-bold"
                  : "bg-zinc-900/80 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}

          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition-colors whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear Search "{searchQuery}"</span>
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 bg-zinc-950/40 rounded-3xl border border-white/5 p-8">
            <Search className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-white mb-2">No garments found</h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6">
              We couldn't find pieces matching "{searchQuery}". Try selecting another category or resetting filters.
            </p>
            <button
              onClick={() => {
                onSearchChange("");
                onSelectCategory("All");
              }}
              className="px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filtered.map((product) => {
              const wishlisted = isWishlisted(product.id);
              const isAdded = justAddedId === product.id;
              const hasDiscount = product.originalPrice && product.originalPrice > product.price;

              return (
                <div
                  key={product.id}
                  onClick={() => onOpenProductModal(product)}
                  className="group bg-zinc-950/80 rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col cursor-pointer shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                >
                  {/* Image Presentation Container */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Second image crossfade on hover if available */}
                    {product.images[1] && (
                      <img
                        src={product.images[1]}
                        alt={`${product.name} secondary angle`}
                        className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      />
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Top Left Tag Badge */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {product.tag && (
                        <span className="px-2.5 py-1 rounded-full bg-black/75 border border-amber-400/40 text-amber-300 text-[10px] font-bold tracking-wider uppercase backdrop-blur-md">
                          {product.tag}
                        </span>
                      )}
                      {hasDiscount && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-600/90 text-white text-[9px] font-extrabold uppercase tracking-wider backdrop-blur-md">
                          Save ${(product.originalPrice! - product.price)}
                        </span>
                      )}
                    </div>

                    {/* Top Right Wishlist Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product);
                      }}
                      className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all backdrop-blur-md cursor-pointer ${
                        wishlisted
                          ? "bg-rose-500 text-white shadow-md"
                          : "bg-black/60 text-zinc-300 hover:text-white hover:bg-black/80 border border-white/10"
                      }`}
                      aria-label="Add to wishlist"
                    >
                      <Heart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
                    </button>

                    {/* Hover Quick Actions Bar */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenProductModal(product);
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-white text-xs font-semibold backdrop-blur-md flex items-center justify-center gap-1.5 border border-white/15 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        <span>Quick View</span>
                      </button>

                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          isAdded
                            ? "bg-emerald-500 text-white"
                            : "bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-md"
                        }`}
                        title="Add to Shopping Bag"
                      >
                        {isAdded ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <ShoppingBag className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Product Details Box */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Subtitle & Rating */}
                      <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                        <span className="uppercase tracking-widest text-[10px] text-amber-400/90 font-medium truncate max-w-[140px]">
                          {product.subtitle}
                        </span>
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-bold shrink-0">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{product.rating}</span>
                          <span className="text-zinc-500 font-normal text-[10px]">({product.reviewsCount})</span>
                        </div>
                      </div>

                      {/* Product Name */}
                      <h3 className="text-sm sm:text-base font-serif text-white font-normal line-clamp-1 group-hover:text-amber-200 transition-colors">
                        {product.name}
                      </h3>

                      {/* Color Dots */}
                      <div className="flex items-center gap-1.5 mt-2.5">
                        {product.colors.slice(0, 3).map((color, cIdx) => (
                          <span
                            key={cIdx}
                            className="w-3 h-3 rounded-full border border-white/20"
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                        ))}
                        {product.colors.length > 3 && (
                          <span className="text-[10px] text-zinc-400 font-medium">
                            +{product.colors.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price and Cart Row */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-base sm:text-lg font-serif font-bold text-white">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-zinc-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>

                      <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 group-hover:text-amber-400 transition-colors">
                        View Details →
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
