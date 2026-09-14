import React, { useState } from "react";
import {
  X,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingCart,
  Zap,
  Heart,
  Share2,
} from "lucide-react";
import { ElectronicsProduct, ProductVariant } from "./types";

interface TechNovaProductModalProps {
  product: ElectronicsProduct | null;
  onClose: () => void;
  onAddToCart: (product: ElectronicsProduct, variant?: ProductVariant, quantity?: number) => void;
  onBuyNow: (product: ElectronicsProduct, variant?: ProductVariant, quantity?: number) => void;
  onToggleWishlist: (product: ElectronicsProduct) => void;
  isWishlisted: boolean;
}

export function TechNovaProductModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
}: TechNovaProductModalProps) {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "reviews">("specs");

  const effectivePrice = product.price + (selectedVariant?.priceModifier || 0);
  const effectiveOriginal = product.originalPrice + (selectedVariant?.priceModifier || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#090D17] border border-cyan-500/30 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-[#0B0F1C]/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black tracking-widest text-cyan-400 uppercase">
              {product.brand} • {product.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWishlist(product)}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isWishlisted
                  ? "bg-rose-600 text-white border-rose-400"
                  : "bg-slate-900 border-slate-700 text-slate-300 hover:text-white"
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? "fill-white" : ""}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Gallery */}
            <div className="space-y-4">
              {/* Main large image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#06080F] border border-slate-800/80">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {product.discountPercent && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-black text-xs font-black tracking-wider">
                    SAVE {product.discountPercent}%
                  </div>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                        activeImage === img ? "border-cyan-400 scale-105 shadow-md" : "border-slate-800 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Info & Actions */}
            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                  {product.name}
                </h2>

                {/* Rating & Reviews counter */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Zap key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-white">{product.rating}</span>
                  <span className="text-xs text-slate-400">({product.reviewsCount} verified reviews)</span>
                </div>

                {/* Pricing display */}
                <div className="flex items-baseline gap-3 pt-2">
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                    ${effectivePrice}
                  </div>
                  {effectiveOriginal > effectivePrice && (
                    <div className="text-base text-slate-500 line-through">
                      ${effectiveOriginal}
                    </div>
                  )}
                  <div className="px-2 py-0.5 rounded-md bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
                    In Stock ({product.stockCount || 15} units)
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed pt-1">
                  {product.description}
                </p>

                {/* Available Variants Selection */}
                {product.variants && product.variants.length > 0 && (
                  <div className="space-y-2 pt-3 border-t border-slate-800">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Choose Variant: {selectedVariant?.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v, i) => {
                        const isSelected = selectedVariant?.name === v.name;
                        return (
                          <button
                            key={i}
                            onClick={() => setSelectedVariant(v)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                              isSelected
                                ? "bg-cyan-950 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                                : "bg-slate-900 border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-500"
                            }`}
                          >
                            {v.colorHex && (
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-white/40"
                                style={{ backgroundColor: v.colorHex }}
                              />
                            )}
                            <span>{v.storageOrSize || v.colorName || v.name}</span>
                            {v.priceModifier ? (
                              <span className="text-cyan-400 font-normal">
                                (+${v.priceModifier})
                              </span>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 pt-3 border-t border-slate-800">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Quantity</span>
                  <div className="flex items-center rounded-xl bg-slate-900 border border-slate-700/80 p-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Add to Cart & Buy Now */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onAddToCart(product, selectedVariant, quantity)}
                    className="py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-cyan-500/30 hover:border-cyan-400 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <ShoppingCart className="w-4 h-4 text-cyan-400" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => onBuyNow(product, selectedVariant, quantity)}
                    className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Buy Now</span>
                  </button>
                </div>

                {/* Micro guarantees */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-slate-400 text-center">
                  <div className="flex flex-col items-center">
                    <Truck className="w-3.5 h-3.5 text-cyan-400 mb-1" />
                    <span>Express Dispatch</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 mb-1" />
                    <span>2-Year Warranty</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <RotateCcw className="w-3.5 h-3.5 text-cyan-400 mb-1" />
                    <span>30-Day Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications & Customer Reviews Tabs */}
          <div className="pt-6 border-t border-slate-800">
            <div className="flex gap-4 border-b border-slate-800 pb-3 mb-6">
              <button
                onClick={() => setActiveTab("specs")}
                className={`text-sm font-bold pb-2 transition-colors cursor-pointer ${
                  activeTab === "specs"
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Technical Specifications
              </button>

              <button
                onClick={() => setActiveTab("reviews")}
                className={`text-sm font-bold pb-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "reviews"
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>Customer Reviews</span>
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {product.reviews.length}
                </span>
              </button>
            </div>

            {/* Tab 1: Specs */}
            {activeTab === "specs" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs"
                  >
                    <span className="font-semibold text-slate-400">{spec.name}</span>
                    <span className="font-bold text-white text-right max-w-[60%]">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Reviews */}
            {activeTab === "reviews" && (
              <div className="space-y-4">
                {product.reviews.map((r) => (
                  <div key={r.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{r.author}</span>
                        {r.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 font-semibold border border-cyan-500/30">
                            <Check className="w-3 h-3 text-cyan-400" />
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500">{r.date}</span>
                    </div>

                    <div className="flex items-center text-amber-400 text-xs">
                      {[...Array(r.rating)].map((_, i) => (
                        <Zap key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>

                    <h4 className="text-xs font-bold text-white">{r.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
