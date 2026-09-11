import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  ShoppingCart,
  Eye,
  Heart,
  Zap,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { ElectronicsProduct, ElectronicsCategory } from "./types";
import { CATEGORIES_DATA } from "./technovaData";

interface TechNovaProductGridProps {
  products: ElectronicsProduct[];
  selectedCategory: ElectronicsCategory;
  onSelectCategory: (cat: ElectronicsCategory) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  onQuickView: (product: ElectronicsProduct) => void;
  onAddToCart: (product: ElectronicsProduct) => void;
  onToggleWishlist: (product: ElectronicsProduct) => void;
  wishlistIds: string[];
}

export function TechNovaProductGrid({
  products,
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}: TechNovaProductGridProps) {
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [priceFilter, setPriceFilter] = useState<"all" | "under300" | "300to1000" | "over1000">("all");

  const categoryOptions: ElectronicsCategory[] = [
    "All",
    "Smartphones",
    "Laptops",
    "Smart TVs",
    "Tablets",
    "Smartwatches",
    "Headphones & Earbuds",
    "Gaming",
    "Accessories",
  ];

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== "All" && p.category !== selectedCategory) {
          return false;
        }
        // Search term filter
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCategory = p.category.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCategory && !matchBrand) {
            return false;
          }
        }
        // Price filter
        if (priceFilter === "under300" && p.price >= 300) return false;
        if (priceFilter === "300to1000" && (p.price < 300 || p.price > 1000)) return false;
        if (priceFilter === "over1000" && p.price <= 1000) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, searchTerm, priceFilter, sortBy]);

  return (
    <section id="products" className="py-16 bg-[#07090E] border-b border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-black tracking-widest text-cyan-400 uppercase mb-2">
              Browse Complete Inventory
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              FEATURED HARDWARE CATALOG
            </h2>
          </div>
          <div className="text-slate-400 text-sm">
            Showing <span className="text-cyan-400 font-bold">{filteredProducts.length}</span> devices ready for dispatch
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0F1A] border border-slate-800 space-y-4 mb-10 shadow-lg">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {categoryOptions.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.35)]"
                    : "bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sub-Filters: Price filter + Sort selector */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/80">
            {/* Price filter buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Price:</span>
              </span>
              {(
                [
                  { id: "all", label: "All Prices" },
                  { id: "under300", label: "Under $300" },
                  { id: "300to1000", label: "$300 - $1,000" },
                  { id: "over1000", label: "$1,000+" },
                ] as const
              ).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPriceFilter(p.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    priceFilter === p.id
                      ? "bg-cyan-950 border border-cyan-500/50 text-cyan-300 font-bold"
                      : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
                <span>Sort by:</span>
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-white font-medium focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="featured">Featured / Best Match</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-2xl bg-[#0A0E18] border border-slate-800">
            <Search className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No products match your criteria</h3>
            <p className="text-sm text-slate-400 mb-4">Try clearing your filters or changing your search terms.</p>
            <button
              onClick={() => {
                onSelectCategory("All");
                onSearchChange("");
                setPriceFilter("all");
              }}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const hasDiscount = product.originalPrice > product.price;

              return (
                <div
                  key={product.id}
                  className="group relative rounded-2xl bg-[#0C101C] border border-slate-800/90 hover:border-cyan-500/40 p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_15px_30px_rgba(6,182,212,0.12)] transform hover:-translate-y-1"
                >
                  {/* Image & Badges */}
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-[#07090F] mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 text-[10px] font-black tracking-wider uppercase backdrop-blur-md shadow-md">
                        {product.badge}
                      </div>
                    )}

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
                        aria-label="Save to Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? "fill-white" : ""}`} />
                      </button>

                      <button
                        onClick={() => onQuickView(product)}
                        className="p-2 rounded-lg bg-black/60 hover:bg-black/80 text-slate-300 hover:text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                        title="Quick View Details"
                        aria-label="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Product Details */}
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

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Key spec preview chip */}
                    {product.specs[0] && (
                      <div className="pt-1">
                        <span className="inline-block text-[10px] px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 line-clamp-1">
                          {product.specs[0].name}: {product.specs[0].value}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Price and Cart */}
                  <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <div>
                      {hasDiscount && (
                        <div className="text-xs text-slate-400 line-through">${product.originalPrice}</div>
                      )}
                      <div className="text-xl font-black text-white">
                        ${product.price}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onQuickView(product)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onAddToCart(product)}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
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
