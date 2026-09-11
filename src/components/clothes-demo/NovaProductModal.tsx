import React, { useState, useEffect } from "react";
import {
  X,
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Check,
  ChevronRight,
  Info
} from "lucide-react";
import { Product, ProductColor } from "./types";

interface NovaProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, selectedSize: string, selectedColor: ProductColor, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
}

export function NovaProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}: NovaProductModalProps) {
  if (!isOpen || !product) return null;

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "M");
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: "Default", hex: "#000000" });
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "care">("details");
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Reset defaults when product changes
  useEffect(() => {
    if (product) {
      setSelectedImgIndex(0);
      setSelectedSize(product.sizes[0] || "M");
      setSelectedColor(product.colors[0] || { name: "Default", hex: "#000000" });
      setQuantity(1);
      setActiveTab("details");
    }
  }, [product]);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const wishlisted = isWishlisted(product.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Dark Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog Container */}
      <div className="relative bg-[#111114] border border-white/15 rounded-3xl max-w-5xl w-full overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] z-10 animate-in fade-in zoom-in-95 duration-200 text-white my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image Gallery */}
          <div className="p-6 md:p-8 bg-[#0a0a0c] flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
            {/* Main Stage Image */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-inner">
              <img
                src={product.images[selectedImgIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {product.tag && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/80 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wider uppercase backdrop-blur-md">
                    {product.tag}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      selectedImgIndex === idx
                        ? "border-amber-400 scale-95 shadow-md"
                        : "border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View angle ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Specs, Options & Actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold">
                  {product.subtitle}
                </span>

                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{product.rating}</span>
                  <span className="text-zinc-400 font-normal">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wide font-light">
                {product.name}
              </h2>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-3 pb-4 border-b border-white/10">
                <span className="text-3xl font-serif font-bold text-white">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-zinc-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                    Save ${product.originalPrice - product.price} (25% OFF)
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-zinc-300 text-sm leading-relaxed mt-4 font-light">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="text-zinc-400 uppercase tracking-wider font-semibold">
                    Select Color: <strong className="text-white font-normal ml-1">{selectedColor.name}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                        selectedColor.hex === color.hex
                          ? "border-amber-400 scale-110 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                          : "border-white/20 hover:border-white/50"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor.hex === color.hex && (
                        <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="text-zinc-400 uppercase tracking-wider font-semibold">
                    Select Size: <strong className="text-white font-normal ml-1">{selectedSize}</strong>
                  </span>
                  <button
                    onClick={() => alert("Size Guide:\nXS: Chest 34\" / Waist 28\"\nS: Chest 36-38\" / Waist 30-32\"\nM: Chest 40-42\" / Waist 32-34\"\nL: Chest 44-46\" / Waist 36-38\"\nXL: Chest 48-50\" / Waist 40-42\"")}
                    className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Info className="w-3 h-3" />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                        selectedSize === size
                          ? "bg-amber-400 text-zinc-950 shadow-md font-bold"
                          : "bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-white/10"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                  Quantity:
                </span>
                <div className="flex items-center bg-zinc-900 border border-white/10 rounded-xl px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 text-zinc-300 hover:text-white font-bold flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 text-zinc-300 hover:text-white font-bold flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    addedFeedback
                      ? "bg-emerald-500 text-white"
                      : "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 shadow-[0_0_25px_rgba(245,158,11,0.35)]"
                  }`}
                >
                  {addedFeedback ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added To Shopping Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add To Bag • ${(product.price * quantity)}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3.5 rounded-full border transition-all cursor-pointer ${
                    wishlisted
                      ? "bg-rose-500 border-rose-500 text-white"
                      : "bg-zinc-900 border-white/15 text-zinc-300 hover:text-white hover:bg-zinc-800"
                  }`}
                  aria-label="Wishlist item"
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`} />
                </button>
              </div>

              {/* Tabs for Details vs Care */}
              <div className="pt-4">
                <div className="flex border-b border-white/10 text-xs mb-3">
                  <button
                    onClick={() => setActiveTab("details")}
                    className={`pb-2 mr-6 font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
                      activeTab === "details"
                        ? "text-amber-400 border-b-2 border-amber-400"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Craftsmanship & Fit
                  </button>
                  <button
                    onClick={() => setActiveTab("care")}
                    className={`pb-2 font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
                      activeTab === "care"
                        ? "text-amber-400 border-b-2 border-amber-400"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Fabric & Care
                  </button>
                </div>

                {activeTab === "details" ? (
                  <ul className="space-y-1.5 text-xs text-zinc-400 font-light">
                    {product.details.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-1.5 text-xs text-zinc-400 font-light">
                    {product.fabricCare.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Shipping & Return Micro Bar */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-zinc-400">
                <div className="flex items-center gap-1.5 bg-zinc-900/60 p-2 rounded-lg">
                  <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Complimentary express delivery</span>
                </div>
                <div className="flex items-center gap-1.5 bg-zinc-900/60 p-2 rounded-lg">
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>30-day effortless returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
