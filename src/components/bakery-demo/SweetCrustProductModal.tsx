import React, { useState } from "react";
import { BakeryProduct, BakeryReview } from "./types";
import { X, ShoppingBag, Zap, Check, Heart, ShieldCheck, Clock, Award } from "lucide-react";

interface SweetCrustProductModalProps {
  product: BakeryProduct | null;
  onClose: () => void;
  onAddToCart: (product: BakeryProduct, size: string, quantity: number) => void;
  onBuyNow: (product: BakeryProduct, size: string, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
}

export function SweetCrustProductModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
}: SweetCrustProductModalProps) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "Standard");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "reviews">("details");
  const [userComment, setUserComment] = useState("");
  const [userRating, setUserRating] = useState(5);
  const [reviewsList, setReviewsList] = useState<BakeryReview[]>(product.reviews);
  const [newReviewSubmitted, setNewReviewSubmitted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;
    const newRev: BakeryReview = {
      id: "r-" + Date.now(),
      author: "You (Verified Patron)",
      rating: userRating,
      date: "Just now",
      comment: userComment,
      verified: true,
    };
    setReviewsList([newRev, ...reviewsList]);
    setUserComment("");
    setNewReviewSubmitted(true);
    setTimeout(() => setNewReviewSubmitted(false), 3000);
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedSize, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FFFDF9] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#EADBCE] z-10 my-8 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#3C2415] hover:text-[#9C4A1A] transition-colors z-20 shadow-md cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Large Product Image */}
          <div className="md:col-span-6 relative bg-[#2D1B10] flex items-center justify-center min-h-[300px] md:min-h-full">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover max-h-[480px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              <span className="px-3 py-1 rounded-full bg-[#9C4A1A] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                {product.category}
              </span>
              {product.isBestSeller && (
                <span className="px-3 py-1 rounded-full bg-[#E6A15C] text-[#3C2415] text-xs font-black uppercase shadow-md">
                  Best Seller
                </span>
              )}
            </div>

            {/* Floating Wishlist Button */}
            <button
              onClick={() => onToggleWishlist(product.id)}
              className={`absolute bottom-4 right-4 p-3 rounded-full backdrop-blur-md shadow-lg transition-transform ${
                isWishlisted
                  ? "bg-rose-50 text-rose-600 scale-110"
                  : "bg-white/90 text-[#3C2415] hover:text-rose-600"
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-rose-600" : ""}`} />
            </button>
          </div>

          {/* Right Column: Product Details, Size Selection, Actions & Reviews */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Star Rating & Category */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-rose-500">
                  {[...Array(5)].map((_, i) => (
                    <Heart
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-rose-500 text-rose-500"
                          : "text-neutral-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#3C2415]">{product.rating}</span>
                <span className="text-xs text-[#8A7565]">
                  ({reviewsList.length} reviews)
                </span>
              </div>

              {/* Product Name */}
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#3C2415] tracking-tight">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 my-3">
                <span className="text-2xl sm:text-3xl font-black text-[#9C4A1A]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#8A7565] line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>

              {/* Tabs: Details / Reviews */}
              <div className="flex border-b border-[#EADBCE] gap-6 text-sm mb-4">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`pb-2 font-bold transition-colors cursor-pointer ${
                    activeTab === "details"
                      ? "text-[#9C4A1A] border-b-2 border-[#9C4A1A]"
                      : "text-[#8A7565] hover:text-[#3C2415]"
                  }`}
                >
                  Product Details
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-2 font-bold transition-colors cursor-pointer ${
                    activeTab === "reviews"
                      ? "text-[#9C4A1A] border-b-2 border-[#9C4A1A]"
                      : "text-[#8A7565] hover:text-[#3C2415]"
                  }`}
                >
                  Customer Reviews ({reviewsList.length})
                </button>
              </div>

              {activeTab === "details" ? (
                <div className="space-y-4 text-xs sm:text-sm text-[#6B5341] leading-relaxed">
                  <p>{product.description}</p>

                  {/* Dietary tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {product.dietary.map((d) => (
                      <span
                        key={d}
                        className="px-2.5 py-1 rounded-full bg-[#FAF3EC] text-[#80350A] text-xs font-semibold border border-[#EADBCE]"
                      >
                        ✓ {d}
                      </span>
                    ))}
                  </div>

                  {/* Ingredients */}
                  {product.ingredients && (
                    <div className="p-3 rounded-xl bg-[#FAF3EC]/70 border border-[#EADBCE]">
                      <p className="font-bold text-[#3C2415] mb-1">Key Artisanal Ingredients:</p>
                      <p className="text-xs text-[#7A6453]">
                        {product.ingredients.join(" • ")}
                      </p>
                    </div>
                  )}

                  {/* Size / Weight Selection */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3C2415] mb-2">
                      Choose Size / Weight:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            selectedSize === s
                              ? "border-[#9C4A1A] bg-[#9C4A1A] text-white shadow-xs"
                              : "border-[#DFCBB7] bg-white text-[#5A4333] hover:border-[#C67D34]"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="pt-1 flex items-center gap-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3C2415]">
                      Quantity:
                    </span>
                    <div className="flex items-center rounded-xl border border-[#DFCBB7] bg-white overflow-hidden shadow-xs">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1.5 text-sm font-bold text-[#3C2415] hover:bg-[#F5ECE1] transition-colors"
                      >
                        −
                      </button>
                      <span className="px-3 text-sm font-bold text-[#3C2415]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1.5 text-sm font-bold text-[#3C2415] hover:bg-[#F5ECE1] transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs text-[#8A7565]">
                      Total: ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ) : (
                /* Reviews Tab */
                <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                  {/* Write a review form */}
                  <form onSubmit={handleAddReview} className="p-3.5 rounded-2xl bg-[#FAF3EC] border border-[#EADBCE] space-y-2.5">
                    <p className="text-xs font-bold text-[#3C2415]">Leave a Review</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setUserRating(star)}
                          className="cursor-pointer"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              star <= userRating
                                ? "fill-rose-500 text-rose-500"
                                : "text-neutral-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      placeholder="Share your taste experience..."
                      rows={2}
                      className="w-full p-2 text-xs bg-white rounded-xl border border-[#DFCBB7] text-[#3C2415] outline-hidden focus:border-[#C67D34]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 rounded-lg bg-[#3C2415] text-white text-xs font-bold hover:bg-[#9C4A1A] transition-colors cursor-pointer"
                    >
                      Post Review
                    </button>
                    {newReviewSubmitted && (
                      <span className="text-xs text-emerald-700 font-bold ml-2">
                        ✓ Review posted!
                      </span>
                    )}
                  </form>

                  {/* Existing Reviews */}
                  {reviewsList.map((rev) => (
                    <div key={rev.id} className="p-3 rounded-xl bg-white border border-[#EADBCE] text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[#3C2415]">{rev.author}</span>
                        <span className="text-[10px] text-[#8A7565]">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-rose-500 mb-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Heart key={i} className="w-3 h-3 fill-rose-500" />
                        ))}
                      </div>
                      <p className="text-[#6B5341]">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons: Add to Cart & Buy Now */}
            <div className="pt-4 border-t border-[#F0E6D8] grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                  justAdded
                    ? "bg-emerald-700 text-white"
                    : "bg-[#3C2415] text-[#FFFDF9] hover:bg-[#9C4A1A]"
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#FEE6D0]" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#C67D34] to-[#9C4A1A] text-white hover:brightness-110 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Zap className="w-4 h-4 text-amber-200" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
