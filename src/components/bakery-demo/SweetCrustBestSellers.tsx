import React, { useState } from "react";
import { BakeryProduct, ProductCategory } from "./types";
import { Star, Heart, ShoppingBag, Eye, Sparkles, Check } from "lucide-react";

interface SweetCrustBestSellersProps {
  products: BakeryProduct[];
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onAddToCart: (product: BakeryProduct, size?: string) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  onOpenProductModal: (product: BakeryProduct) => void;
}

export function SweetCrustBestSellers({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onOpenProductModal,
}: SweetCrustBestSellersProps) {
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filterTabs: { label: string; value: ProductCategory }[] = [
    { label: "All Items", value: "all" },
    { label: "Cakes", value: "cakes" },
    { label: "Pastries", value: "pastries" },
    { label: "Breads", value: "breads" },
    { label: "Cookies", value: "cookies" },
    { label: "Donuts", value: "donuts" },
    { label: "Cupcakes", value: "cupcakes" },
    { label: "Desserts", value: "desserts" },
    { label: "Beverages", value: "beverages" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleAddWithFeedback = (product: BakeryProduct) => {
    onAddToCart(product);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  return (
    <section id="best-sellers" className="py-16 bg-[#FAF3EC]/60 border-b border-[#F0E6D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4E6D6] text-[#9C4A1A] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C67D34]" />
              <span>FRESH FROM THE OVEN</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-[#3C2415]">
              Best Sellers & Menu
            </h2>
            <p className="text-sm sm:text-base text-[#6B5341] mt-1 max-w-xl">
              Our most celebrated creations loved by our neighborhood. Crafted with French butter, natural leavening, and premium chocolate.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none max-w-full">
            {filterTabs.map((tab) => {
              const active = selectedCategory === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => onSelectCategory(tab.value)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-[#3C2415] text-white shadow-sm"
                      : "bg-white text-[#5A4333] hover:bg-[#F0E6D8] border border-[#EADBCE]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const isJustAdded = justAddedId === product.id;

            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-2xl overflow-hidden border border-[#EADBCE] hover:border-[#C67D34] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Image Container */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-[#2D1B10]">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Tags */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isBestSeller && (
                      <span className="px-2.5 py-1 rounded-full bg-[#9C4A1A] text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
                        Best Seller
                      </span>
                    )}
                    {product.discountPercent && (
                      <span className="px-2 py-0.5 rounded-full bg-[#E6A15C] text-[#3C2415] text-[10px] font-black uppercase shadow-xs">
                        {product.discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-transform duration-200 cursor-pointer ${
                      isWishlisted
                        ? "bg-rose-50 text-rose-600 shadow-md scale-110"
                        : "bg-white/80 text-[#5A4333] hover:text-rose-600 hover:scale-110"
                    }`}
                    aria-label="Toggle Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${isWishlisted ? "fill-rose-600" : ""}`}
                    />
                  </button>

                  {/* Quick View Button (hover desktop) */}
                  <div className="absolute inset-x-4 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => onOpenProductModal(product)}
                      className="w-full py-2 px-3 rounded-xl bg-white/95 backdrop-blur-md text-[#3C2415] text-xs font-bold hover:bg-[#3C2415] hover:text-white transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View & Details</span>
                    </button>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Rating & Category */}
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9C4A1A]">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-600 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{product.rating}</span>
                        <span className="text-[#8A7565] font-normal">({product.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <button
                      onClick={() => onOpenProductModal(product)}
                      className="text-left font-serif font-bold text-lg text-[#3C2415] hover:text-[#9C4A1A] transition-colors line-clamp-1 cursor-pointer focus:outline-hidden"
                    >
                      {product.name}
                    </button>

                    {/* Short Description */}
                    <p className="text-xs text-[#6B5341] line-clamp-2 mt-1 mb-3">
                      {product.shortDesc}
                    </p>

                    {/* Dietary Badges */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.dietary.slice(0, 2).map((diet) => (
                        <span
                          key={diet}
                          className="px-2 py-0.5 rounded-md bg-[#FAF3EC] text-[#705846] text-[10px] font-medium border border-[#EBDDCE]"
                        >
                          {diet}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price and Add to Cart CTA */}
                  <div className="pt-3 border-t border-[#F0E6D8] flex items-center justify-between">
                    <div>
                      {product.originalPrice && (
                        <span className="text-[11px] text-[#9A8676] line-through block">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-lg font-black text-[#3C2415]">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddWithFeedback(product)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-xs ${
                        isJustAdded
                          ? "bg-emerald-700 text-white"
                          : "bg-[#3C2415] text-[#FFFDF9] hover:bg-[#9C4A1A] active:scale-95"
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5 text-[#FEE6D0]" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
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
