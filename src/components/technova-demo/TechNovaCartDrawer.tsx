import React, { useState } from "react";
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, Tag } from "lucide-react";
import { CartItem } from "./types";

interface TechNovaCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export function TechNovaCartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: TechNovaCartDrawerProps) {
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.product.price + (item.selectedVariant?.priceModifier || 0);
    return acc + itemPrice * item.quantity;
  }, 0);

  const discountAmount = promoApplied ? Math.round(subtotal * promoDiscount) : 0;
  const shipping = subtotal >= 99 || subtotal === 0 ? 0 : 15;
  const estimatedTax = Math.round((subtotal - discountAmount) * 0.08);
  const total = Math.max(0, subtotal - discountAmount + shipping + estimatedTax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    if (promoCode.trim().toUpperCase() === "TECH10" || promoCode.trim().toUpperCase() === "NOVA10") {
      setPromoDiscount(0.1);
      setPromoApplied(true);
    } else {
      setPromoError("Invalid code. Try 'TECH10' for 10% off demo discount!");
    }
  };

  const handleSimulateCheckout = () => {
    setCheckoutModalOpen(true);
    setTimeout(() => {
      setOrderComplete(true);
      onClearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#090D17] border-l border-cyan-500/30 text-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-[#0B0F1C]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-black tracking-wide text-white">Your Shopping Cart</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 font-bold border border-cyan-500/30">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Your cart is empty</h3>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Explore our smartphones, laptops, smart TVs and audio collection to add devices.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-bold cursor-pointer hover:from-cyan-500 hover:to-blue-500 transition-all shadow-md"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemPrice = item.product.price + (item.selectedVariant?.priceModifier || 0);

                return (
                  <div
                    key={item.cartItemId}
                    className="flex gap-4 p-3.5 rounded-2xl bg-[#0E1322] border border-slate-800"
                  >
                    {/* Item Image */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-xl object-cover bg-slate-950 flex-shrink-0"
                    />

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.cartItemId)}
                            className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.selectedVariant && (
                          <div className="text-[11px] text-cyan-400 font-medium mt-0.5">
                            {item.selectedVariant.name}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity adjust */}
                        <div className="flex items-center rounded-lg bg-slate-900 border border-slate-700/80 px-1 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-white">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-sm font-black text-white">
                          ${itemPrice * item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer Calculations */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-[#0B0F1C] space-y-4">
              {/* Promo code simulator */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo Code (Try TECH10)"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 border border-slate-700 cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {promoApplied && (
                <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Promo TECH10 applied! 10% off your order.</span>
                </div>
              )}

              {promoError && (
                <div className="text-xs text-rose-400 font-semibold">{promoError}</div>
              )}

              {/* Totals */}
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">${subtotal}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount (10%)</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span className="font-bold text-cyan-400">
                    {shipping === 0 ? "FREE" : `$${shipping}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="font-bold text-white">${estimatedTax}</span>
                </div>

                <div className="flex justify-between pt-2 border-t border-slate-800 text-base font-black text-white">
                  <span>Total Due</span>
                  <span className="text-cyan-300">${total}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleSimulateCheckout}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>256-Bit Encrypted Secure Demo Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Simulated Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl bg-[#0B0F1C] border border-cyan-500/30 p-6 text-center space-y-5 shadow-2xl">
            {!orderComplete ? (
              <div className="py-8 space-y-4">
                <div className="w-14 h-14 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin mx-auto" />
                <h3 className="text-lg font-black text-white">Securing Your TechNova Order...</h3>
                <p className="text-xs text-slate-400">Encrypting transaction and allocating serial numbers.</p>
              </div>
            ) : (
              <div className="space-y-4 py-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white">Order Confirmed!</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Thank you for testing the <span className="text-cyan-400 font-bold">TECHNOVA</span> demo store! Order #TN-{Math.floor(100000 + Math.random() * 900000)} has been processed with 2-Year Full Hardware Coverage.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 text-left space-y-1">
                  <div className="flex justify-between">
                    <span>Demo Payment:</span>
                    <span className="text-white font-bold">Authorized (Simulation)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Delivery:</span>
                    <span className="text-cyan-400 font-bold">2 Business Days</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setCheckoutModalOpen(false);
                    setOrderComplete(false);
                    onClose();
                  }}
                  className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
