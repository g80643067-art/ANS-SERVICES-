import React, { useState } from "react";
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Check, Sparkles } from "lucide-react";
import { CartItem } from "./types";

interface NovaCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export function NovaCartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: NovaCartDrawerProps) {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Math
  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = promoApplied ? rawSubtotal * 0.25 : 0;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "NOVA25") {
      setPromoApplied(true);
    } else {
      alert("Invalid code. Try using: NOVA25 for 25% off!");
    }
  };

  const handleCheckout = () => {
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      setCheckoutSuccess(true);
      setTimeout(() => {
        onClearCart();
        setCheckoutSuccess(false);
        onClose();
      }, 3500);
    }, 1500);
  };

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
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-serif font-medium tracking-wide">
                Your Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Checkout Success Screen */}
          {checkoutSuccess ? (
            <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-white mb-2">Order Confirmed</h3>
              <p className="text-sm text-zinc-300 mb-6 font-light">
                Thank you for your patronage. Your bespoke pieces are being prepared by our atelier tailors and dispatched via White Glove courier.
              </p>
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-xs text-zinc-400 w-full space-y-1">
                <div className="flex justify-between">
                  <span>Order Reference:</span>
                  <span className="font-mono text-white">#NV-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Paid:</span>
                  <span className="font-serif font-bold text-amber-400">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-20">
                    <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                    <h3 className="text-base font-serif text-white">Your bag is empty</h3>
                    <p className="text-xs text-zinc-400 mt-1 mb-6 font-light">
                      Discover our new Autumn/Winter runway arrivals and add pieces to your bag.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Start Exploring
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-white/5 relative group"
                    >
                      {/* Thumbnail */}
                      <div className="w-20 h-24 rounded-xl overflow-hidden bg-zinc-800 shrink-0 border border-white/10">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs sm:text-sm font-serif text-white line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-zinc-500 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3 text-[11px] text-zinc-400 mt-1">
                            <span>Size: <strong className="text-white">{item.selectedSize}</strong></span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <span
                                className="w-2.5 h-2.5 rounded-full inline-block border border-white/20"
                                style={{ backgroundColor: item.selectedColor.hex }}
                              />
                              <strong className="text-white">{item.selectedColor.name}</strong>
                            </span>
                          </div>
                        </div>

                        {/* Quantity & Item Subtotal */}
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                          <div className="flex items-center bg-black/60 border border-white/10 rounded-lg">
                            <button
                              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-6 h-6 text-zinc-400 hover:text-white text-xs font-bold flex items-center justify-center cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-xs text-white font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 text-zinc-400 hover:text-white text-xs font-bold flex items-center justify-center cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-sm font-serif font-bold text-white">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Calculations & Checkout */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-black/40 space-y-4">
                  {/* Promo Code Input */}
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo Code (Try NOVA25)"
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white uppercase placeholder-zinc-500 outline-none focus:border-amber-400"
                      />
                    </div>
                    <button
                      onClick={handleApplyPromo}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>

                  {promoApplied && (
                    <div className="flex items-center justify-between text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-lg">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Code NOVA25 Applied (-25%)
                      </span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  {/* Summary Rows */}
                  <div className="space-y-1.5 text-xs text-zinc-400 pt-1">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white font-medium">${rawSubtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Worldwide Express Delivery</span>
                      <span className="text-amber-400 font-semibold uppercase text-[10px]">Complimentary</span>
                    </div>

                    <div className="flex justify-between pt-2 border-t border-white/10 text-base font-serif font-bold text-white">
                      <span>Total Amount</span>
                      <span className="text-amber-300">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={checkingOut}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(245,158,11,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {checkingOut ? (
                      <span>Processing Order...</span>
                    ) : (
                      <>
                        <span>Proceed to Secure Checkout</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-400 text-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>256-bit SSL Encrypted Atelier Checkout Guarantee</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
