import React, { useState } from "react";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Tag,
  CheckCircle2,
  Bike,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import { CartItem } from "../../types";

interface FoodCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export function FoodCartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: FoodCartDrawerProps) {
  const [orderType, setOrderType] = useState<"delivery" | "takeaway" | "dinein">("delivery");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  if (!isOpen) return null;

  const itemTotal = cartItems.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );
  const deliveryFee = orderType === "delivery" ? (itemTotal > 299 ? 0 : 40) : 0;
  const taxesAndPacking = Math.round(itemTotal * 0.05) + 15;
  const discount = discountApplied ? (couponCode.toUpperCase() === "STREET50" ? 50 : Math.round(itemTotal * 0.15)) : 0;
  const finalTotal = Math.max(0, itemTotal + deliveryFee + taxesAndPacking - discount);

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "STREET50" || couponCode.toUpperCase() === "CRAVE20") {
      setDiscountApplied(true);
    } else {
      alert("Invalid coupon. Try 'STREET50' for ₹50 OFF!");
    }
  };

  const generateWhatsAppOrderText = () => {
    const itemsList = cartItems
      .map(
        (ci) =>
          `• ${ci.quantity}x ${ci.food.name} (₹${ci.food.price * ci.quantity})`
      )
      .join("\n");

    const text = `🔥 *NEW ORDER - DESI CRAVE STREET FOOD*\n\n` +
      `👤 *Customer:* ${customerName || "Customer"}\n` +
      `📞 *Phone:* ${customerPhone || "Not provided"}\n` +
      `📍 *Type:* ${orderType.toUpperCase()}\n` +
      (orderType === "delivery" ? `🏠 *Address:* ${customerAddress || "Please ask"}\n` : "") +
      `\n--------------------------------\n` +
      `*ORDER ITEMS:*\n${itemsList}\n` +
      `--------------------------------\n` +
      `💵 *Item Total:* ₹${itemTotal}\n` +
      (deliveryFee > 0 ? `🛵 *Delivery:* ₹${deliveryFee}\n` : `🛵 *Delivery:* FREE\n`) +
      `🧾 *Taxes & Packaging:* ₹${taxesAndPacking}\n` +
      (discount > 0 ? `🎉 *Discount:* -₹${discount}\n` : "") +
      `*TOTAL PAYABLE:* ₹${finalTotal}\n\n` +
      `Please confirm my order & send estimated delivery time!`;

    return encodeURIComponent(text);
  };

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;
    const url = `https://wa.me/917348382816?text=${generateWhatsAppOrderText()}`;
    window.open(url, "_blank");
  };

  const handleDirectOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-zinc-950 border-l border-zinc-800 h-full flex flex-col justify-between shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Your Food Basket</h3>
              <p className="text-[11px] text-zinc-400">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"} selected
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {orderConfirmed ? (
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black text-white mb-2">Order Confirmed!</h4>
              <p className="text-xs text-zinc-300 max-w-xs mb-6">
                Thank you {customerName || "Foodie"}! The kitchen is preparing your piping hot street food now.
              </p>

              {/* Status Stepper */}
              <div className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-left space-y-3 mb-6">
                <div className="flex items-center gap-3 text-xs font-bold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>1. Order Received & Verified</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-amber-400 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>2. Sizzling in Kitchen (~15 mins)</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-zinc-500">
                  <span className="w-2 h-2 rounded-full bg-zinc-700" />
                  <span>3. Out for Express Delivery</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClearCart();
                  setOrderConfirmed(false);
                  onClose();
                }}
                className="w-full py-3.5 rounded-xl font-bold text-xs text-zinc-950 bg-amber-400 hover:bg-amber-300"
              >
                Order More Food
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center">
              <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">Your cart is empty</h4>
              <p className="text-xs text-zinc-400 max-w-xs mb-6">
                Add some crispy burgers, steamed momos, or loaded fries to get started!
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-amber-400 text-zinc-950 hover:bg-amber-300"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {/* Order Mode selector */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-2">
                  Choose Dining Mode:
                </label>
                <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setOrderType("delivery")}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
                      orderType === "delivery"
                        ? "bg-amber-400 text-zinc-950 shadow-sm"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Bike className="w-3.5 h-3.5" />
                    <span>Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType("takeaway")}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
                      orderType === "takeaway"
                        ? "bg-amber-400 text-zinc-950 shadow-sm"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Takeaway</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType("dinein")}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
                      orderType === "dinein"
                        ? "bg-amber-400 text-zinc-950 shadow-sm"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <UtensilsCrossed className="w-3.5 h-3.5" />
                    <span>Dine-In</span>
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-300">
                  <span>Selected Dishes</span>
                  <button
                    onClick={onClearCart}
                    className="text-zinc-500 hover:text-red-400 text-[11px]"
                  >
                    Clear All
                  </button>
                </div>

                {cartItems.map((ci) => (
                  <div
                    key={ci.food.id}
                    className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <img
                        src={ci.food.image}
                        alt={ci.food.name}
                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              ci.food.isVeg ? "bg-emerald-500" : "bg-red-500"
                            }`}
                          />
                          <h4 className="text-xs font-bold text-white truncate">
                            {ci.food.name}
                          </h4>
                        </div>
                        <div className="text-xs text-amber-400 font-bold mt-0.5">
                          ₹{ci.food.price * ci.quantity}
                          <span className="text-zinc-500 font-normal text-[10px] ml-1">
                            (₹{ci.food.price} each)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-lg p-1">
                      <button
                        onClick={() => onUpdateQuantity(ci.food.id, -1)}
                        className="w-6 h-6 rounded bg-zinc-900 text-zinc-300 hover:text-white flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white px-1">
                        {ci.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(ci.food.id, 1)}
                        className="w-6 h-6 rounded bg-amber-400 text-zinc-950 hover:bg-amber-300 flex items-center justify-center font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Coupon box */}
              <div className="p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Promo (try 'STREET50')"
                  className="bg-transparent text-xs text-white uppercase placeholder-zinc-500 focus:outline-none flex-1"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-white"
                >
                  {discountApplied ? "Applied!" : "Apply"}
                </button>
              </div>

              {/* Customer Contact Details */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-zinc-300">Your Details:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Name *"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="WhatsApp Phone Number *"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {orderType === "delivery" && (
                  <input
                    type="text"
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Complete Delivery Address & Flat / Landmark *"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                  />
                )}

                {orderType === "dinein" && (
                  <input
                    type="text"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Table Number (e.g. Table 04)"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                  />
                )}
              </div>

              {/* Bill Details */}
              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-300">
                  <span>Item Subtotal</span>
                  <span>₹{itemTotal}</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>Delivery Charge</span>
                  <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>GST & Packaging</span>
                  <span>₹{taxesAndPacking}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Promo Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="h-[1px] bg-zinc-800 my-1" />
                <div className="flex justify-between text-sm font-black text-white">
                  <span>To Pay</span>
                  <span className="text-amber-400 text-base">₹{finalTotal}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {!orderConfirmed && cartItems.length > 0 && (
          <div className="p-5 border-t border-zinc-800 bg-zinc-900/90 space-y-2.5">
            {/* WhatsApp Order button */}
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full py-3.5 rounded-xl font-black text-xs sm:text-sm text-emerald-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-950" />
              <span>Order via WhatsApp (Instant Dispatch)</span>
            </button>

            {/* Direct Order button */}
            <button
              onClick={handleDirectOrder}
              className="w-full py-3.5 rounded-xl font-black text-xs sm:text-sm text-zinc-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-300 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Confirm Order (Pay on Delivery / UPI)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
