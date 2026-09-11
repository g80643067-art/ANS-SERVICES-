import React from "react";
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { ElectronicsProduct } from "./types";

interface TechNovaWishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: ElectronicsProduct[];
  onRemoveFromWishlist: (product: ElectronicsProduct) => void;
  onMoveToCart: (product: ElectronicsProduct) => void;
  onQuickView: (product: ElectronicsProduct) => void;
}

export function TechNovaWishlistDrawer({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToCart,
  onQuickView,
}: TechNovaWishlistDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#090D17] border-l border-cyan-500/30 text-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-[#0B0F1C]">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h2 className="text-lg font-black tracking-wide text-white">Your Saved Devices</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 font-bold border border-rose-500/30">
                {wishlistProducts.length}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                  <Heart className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Your wishlist is empty</h3>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Click the heart icon on any device card to save it for later comparison or purchase.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 text-white text-xs font-bold cursor-pointer hover:bg-cyan-500 transition-all"
                >
                  Explore Devices
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3.5 rounded-2xl bg-[#0E1322] border border-slate-800"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover bg-slate-950 flex-shrink-0 cursor-pointer"
                    onClick={() => onQuickView(product)}
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4
                          onClick={() => onQuickView(product)}
                          className="text-xs sm:text-sm font-bold text-white line-clamp-1 hover:text-cyan-300 cursor-pointer"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product)}
                          className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer transition-colors"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-xs font-bold text-cyan-400 mt-1">${product.price}</div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => {
                          onMoveToCart(product);
                          onRemoveFromWishlist(product);
                        }}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>Move to Cart</span>
                      </button>

                      <button
                        onClick={() => onQuickView(product)}
                        className="py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
                        title="View"
                      >
                        View
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
