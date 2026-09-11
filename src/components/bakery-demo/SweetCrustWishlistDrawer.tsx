import React from "react";
import { BakeryProduct } from "./types";
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

interface SweetCrustWishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: BakeryProduct[];
  onRemoveWishlist: (productId: string) => void;
  onAddToCart: (product: BakeryProduct) => void;
  onOpenProductModal: (product: BakeryProduct) => void;
}

export function SweetCrustWishlistDrawer({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onAddToCart,
  onOpenProductModal,
}: SweetCrustWishlistDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] shadow-2xl border-l border-[#EADBCE] flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#F0E6D8] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Heart className="w-5 h-5 fill-rose-600" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#3C2415]">
                  Your Saved Favorites
                </h3>
                <p className="text-[11px] text-[#8A7565]">
                  {wishlistProducts.length} items bookmarked
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#8A7565] hover:text-[#3C2415] hover:bg-[#FAF3EC] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Heart className="w-12 h-12 text-[#DFCBB7] mx-auto stroke-1" />
                <h4 className="font-serif font-bold text-lg text-[#3C2415]">
                  No favorites yet
                </h4>
                <p className="text-xs text-[#7A6453] max-w-xs mx-auto">
                  Click the heart icon on any cake, pastry, or artisan sourdough to save for later.
                </p>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-white border border-[#EADBCE] shadow-2xs hover:border-[#C67D34] transition-all"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-18 h-18 rounded-xl object-cover shrink-0 bg-[#FAF3EC]"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <button
                          onClick={() => {
                            onClose();
                            onOpenProductModal(product);
                          }}
                          className="text-left font-serif font-bold text-xs sm:text-sm text-[#3C2415] hover:text-[#9C4A1A] line-clamp-1"
                        >
                          {product.name}
                        </button>
                        <button
                          onClick={() => onRemoveWishlist(product.id)}
                          className="text-[#A39080] hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-xs font-black text-[#9C4A1A] mt-0.5 block">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => {
                          onAddToCart(product);
                          onRemoveWishlist(product.id);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#3C2415] text-white text-[11px] font-bold hover:bg-[#9C4A1A] flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3 text-[#FEE6D0]" />
                        <span>Move to Basket</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
