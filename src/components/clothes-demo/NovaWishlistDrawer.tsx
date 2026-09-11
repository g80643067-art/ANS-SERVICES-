import React from "react";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Product } from "./types";

interface NovaWishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenProductModal: (product: Product) => void;
}

export function NovaWishlistDrawer({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onOpenProductModal,
}: NovaWishlistDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#111114] border-l border-white/10 text-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
              <h2 className="text-lg font-serif font-medium tracking-wide">
                Saved Wishlist ({wishlistProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-20">
                <Heart className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-base font-serif text-white">Your wishlist is empty</h3>
                <p className="text-xs text-zinc-400 mt-1 mb-6 font-light">
                  Tap the heart on any luxury piece to save it to your private styling curation.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-white/5 relative group"
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      onOpenProductModal(product);
                      onClose();
                    }}
                    className="w-20 h-24 rounded-xl overflow-hidden bg-zinc-800 shrink-0 border border-white/10 cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            onOpenProductModal(product);
                            onClose();
                          }}
                          className="text-xs sm:text-sm font-serif text-white line-clamp-1 cursor-pointer hover:text-amber-200 transition-colors"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product)}
                          className="text-zinc-500 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-amber-400 uppercase tracking-wider mt-0.5">
                        {product.subtitle}
                      </div>

                      <div className="text-sm font-serif font-bold text-white mt-1">
                        ${product.price}
                      </div>
                    </div>

                    {/* Move to Bag Button */}
                    <div className="mt-3 pt-2 border-t border-white/5">
                      <button
                        onClick={() => {
                          onAddToCart(product);
                          onRemoveFromWishlist(product);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Shopping Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black/40">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
