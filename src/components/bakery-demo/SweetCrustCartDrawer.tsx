import React, { useState } from "react";
import { CartItem } from "./types";
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Tag,
  CheckCircle2,
  Clock,
  MapPin,
} from "lucide-react";

interface SweetCrustCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onBrowseMenu: () => void;
}

export function SweetCrustCartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onBrowseMenu,
}: SweetCrustCartDrawerProps) {
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [fulfillment, setFulfillment] = useState<"delivery" | "pickup">("delivery");
  const [timeSlot, setTimeSlot] = useState("Tomorrow 8:00 AM - 10:00 AM (Warm Batch)");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const subtotal = Math.max(0, rawSubtotal - discountAmount);
  const deliveryCharge = fulfillment === "pickup" || subtotal >= 35 || subtotal === 0 ? 0 : 4.5;
  const grandTotal = subtotal + deliveryCharge;
  const freeDeliveryRemaining = Math.max(0, 35 - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === "SWEET20") {
      setDiscountPercent(20);
      setPromoError("");
    } else if (code === "MORNING38") {
      setDiscountPercent(38);
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try 'SWEET20' or 'MORNING38'");
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNum = "SC-" + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(generatedOrderNum);
    setOrderSuccess(true);
    onClearCart();
  };

  const handleFinishOrder = () => {
    setOrderSuccess(false);
    setCheckoutModalOpen(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] shadow-2xl border-l border-[#EADBCE] flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#F0E6D8] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FAF3EC] text-[#9C4A1A] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#3C2415]">
                  Your Bakery Basket
                </h3>
                <p className="text-[11px] text-[#8A7565]">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} fresh items
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#8A7565] hover:text-[#3C2415] hover:bg-[#FAF3EC] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          <div className="px-5 py-2.5 bg-[#FAF3EC] border-b border-[#F0E6D8] text-xs">
            {freeDeliveryRemaining > 0 ? (
              <div className="space-y-1">
                <div className="flex justify-between text-[#6B5341] text-[11px]">
                  <span>Add <strong>${freeDeliveryRemaining.toFixed(2)}</strong> more for FREE delivery</span>
                  <span className="font-bold text-[#9C4A1A]">{Math.round((subtotal / 35) * 100)}%</span>
                </div>
                <div className="w-full bg-[#EADBCE] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C67D34] h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / 35) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>You have unlocked FREE local doorstep delivery!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#FAF3EC] text-[#9C4A1A] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-10 h-10 stroke-1" />
                </div>
                <h4 className="font-serif font-bold text-xl text-[#3C2415]">
                  Your basket is empty
                </h4>
                <p className="text-xs text-[#7A6453] max-w-xs mx-auto">
                  Our morning croissants, sourdough loaves, and celebration cakes are fresh out of the ovens.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onBrowseMenu();
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#3C2415] text-[#FFFDF9] text-xs font-bold hover:bg-[#9C4A1A] transition-all cursor-pointer shadow-md"
                >
                  Explore Warm Bakes
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-white border border-[#EADBCE] shadow-2xs group hover:border-[#C67D34] transition-all"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-18 h-18 rounded-xl object-cover shrink-0 bg-[#FAF3EC]"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h5 className="text-xs sm:text-sm font-serif font-bold text-[#3C2415] line-clamp-1">
                          {item.product.name}
                        </h5>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#A39080] hover:text-rose-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-[#8A7565] block">
                        {item.selectedSize}
                      </span>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#F5ECE1]">
                      <div className="flex items-center rounded-lg border border-[#DFCBB7] bg-[#FAF3EC] text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-[#3C2415] hover:bg-[#EADBCE] font-bold"
                        >
                          −
                        </button>
                        <span className="px-2 text-xs font-bold text-[#3C2415]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-[#3C2415] hover:bg-[#EADBCE] font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-black text-[#3C2415]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Totals & Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-[#F0E6D8] bg-white space-y-3">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#8A7565] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Coupon (e.g. SWEET20)"
                    className="w-full bg-[#FAF3EC] text-xs text-[#3C2415] placeholder-[#8A7565] pl-8 pr-3 py-2 rounded-xl border border-[#DFCBB7] outline-hidden uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 rounded-xl bg-[#FAF3EC] border border-[#DFCBB7] hover:bg-[#3C2415] hover:text-white text-xs font-bold text-[#5A4333] transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {promoError && (
                <p className="text-[11px] text-rose-600 font-semibold">{promoError}</p>
              )}
              {discountPercent > 0 && (
                <p className="text-[11px] text-emerald-700 font-bold">
                  ✓ {discountPercent}% discount applied!
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#6B5341] pt-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-[#3C2415]">
                    ${rawSubtotal.toFixed(2)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({discountPercent}%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charge:</span>
                  <span className="font-semibold text-[#3C2415]">
                    {deliveryCharge === 0 ? "FREE" : `$${deliveryCharge.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-[#3C2415] pt-2 border-t border-[#F0E6D8]">
                  <span>Total Due:</span>
                  <span className="text-lg text-[#9C4A1A]">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => setCheckoutModalOpen(true)}
                className="w-full py-3.5 rounded-2xl bg-[#3C2415] text-white text-sm font-bold hover:bg-[#9C4A1A] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#3C2415]/15 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#FEE6D0]" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8A7565]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Bakehouse Fresh Guarantee • Contactless Safe Packaging</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#EADBCE] shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-[#8A7565] hover:text-[#3C2415]"
            >
              <X className="w-5 h-5" />
            </button>

            {orderSuccess ? (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif font-black text-2xl text-[#3C2415]">
                  Order Placed Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5341]">
                  Thank you, <strong>{customerName || "Patron"}</strong>! Your order <strong>#{orderNumber}</strong> has been sent to our ovens.
                </p>

                <div className="p-4 rounded-2xl bg-[#FAF3EC] border border-[#EADBCE] text-left text-xs space-y-1.5 text-[#5A4333]">
                  <div className="flex justify-between">
                    <span className="font-bold">Order Number:</span>
                    <span className="font-mono font-bold text-[#9C4A1A]">#{orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fulfillment:</span>
                    <span className="capitalize font-semibold">{fulfillment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Slot:</span>
                    <span className="font-semibold">{timeSlot}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-[#DFCBB7] font-bold text-sm text-[#3C2415]">
                    <span>Total Paid:</span>
                    <span className="text-[#9C4A1A]">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleFinishOrder}
                  className="w-full py-3 rounded-xl bg-[#3C2415] text-white font-bold text-xs hover:bg-[#9C4A1A] transition-colors cursor-pointer"
                >
                  Return to Bakehouse Menu
                </button>
              </div>
            ) : (
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <h3 className="font-serif font-bold text-xl text-[#3C2415]">
                  Complete Bakery Checkout
                </h3>

                {/* Pickup vs Delivery */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFulfillment("delivery")}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                      fulfillment === "delivery"
                        ? "bg-[#3C2415] text-white border-[#3C2415]"
                        : "bg-white text-[#5A4333] border-[#DFCBB7]"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Doorstep Delivery</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFulfillment("pickup")}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                      fulfillment === "pickup"
                        ? "bg-[#3C2415] text-white border-[#3C2415]"
                        : "bg-white text-[#5A4333] border-[#DFCBB7]"
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Store Pickup (Free)</span>
                  </button>
                </div>

                {/* Time slot */}
                <div>
                  <label className="block text-xs font-bold text-[#3C2415] mb-1">
                    Select Fresh Batch Time Slot:
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#DFCBB7] text-xs bg-white text-[#3C2415]"
                  >
                    <option>Today 3:00 PM - 5:00 PM (Afternoon Warm Batch)</option>
                    <option>Tomorrow 7:00 AM - 9:00 AM (Sunrise Oven First Bake)</option>
                    <option>Tomorrow 10:00 AM - 12:00 PM (Mid-Day Pastry Run)</option>
                    <option>Tomorrow 2:00 PM - 4:00 PM (Afternoon Tea Batch)</option>
                  </select>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#3C2415] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rachel Adams"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="w-full p-2 text-xs rounded-xl border border-[#DFCBB7]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#3C2415] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="(555) 019-2834"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                      className="w-full p-2 text-xs rounded-xl border border-[#DFCBB7]"
                    />
                  </div>
                </div>

                {fulfillment === "delivery" && (
                  <div>
                    <label className="block text-[11px] font-bold text-[#3C2415] mb-1">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      placeholder="Street, Apartment or Suite, City"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      required
                      className="w-full p-2 text-xs rounded-xl border border-[#DFCBB7]"
                    />
                  </div>
                )}

                {/* Payment simulated */}
                <div className="pt-2 border-t border-[#F0E6D8] flex items-center justify-between text-xs">
                  <span>Total Amount:</span>
                  <span className="text-base font-black text-[#9C4A1A]">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C67D34] to-[#9C4A1A] text-white font-bold text-xs hover:brightness-110 shadow-md cursor-pointer"
                >
                  Confirm & Place Bakery Order (${grandTotal.toFixed(2)})
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
