import React, { useState } from 'react';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, Tag, Zap } from 'lucide-react';
import { CartItem } from './types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  onRemoveItem: (productId: string, selectedSize?: string) => void;
  onProceedToCheckout: (subtotal: number, discount: number, total: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string>('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 499 || subtotal === 0 ? 0 : 40;
  const totalDiscount = appliedDiscount;
  const finalTotal = Math.max(0, subtotal + deliveryFee - totalDiscount);

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'ANXMART100' || couponCode.toUpperCase() === 'WELCOME100') {
      setAppliedDiscount(100);
      setCouponError('');
    } else if (couponCode.toUpperCase() === 'ANX500') {
      setAppliedDiscount(500);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try ANXMART100');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E5E5E5] text-black flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 bg-[#F7F7F7] border-b border-[#E5E5E5]">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-black" />
              <h3 className="font-black text-base uppercase tracking-wider">Your Shopping Cart ({cartItems.length})</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white border border-[#E5E5E5] text-black hover:bg-black hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#F7F7F7] border border-[#E5E5E5] flex items-center justify-center mx-auto text-black">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg text-black">Your cart is empty</h4>
                <p className="text-xs text-[#666666] max-w-xs mx-auto">
                  Explore our groceries, fashion, electronics, and digital products to add items to your cart.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-black text-white font-bold text-xs hover:bg-[#222222] transition-all shadow-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize || 'nosize'}`}
                  className="flex gap-4 p-4 rounded-2xl bg-[#F7F7F7] border border-[#E5E5E5] relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover bg-white border border-[#E5E5E5]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-black line-clamp-1">{item.product.name}</h4>
                      <div className="flex items-center gap-2 text-[11px] text-[#666666] mt-0.5">
                        {item.selectedSize && <span>Size: <strong className="text-black">{item.selectedSize}</strong></span>}
                        {item.selectedColor && <span>Color: <strong className="text-black">{item.selectedColor}</strong></span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-extrabold text-sm text-black">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#E5E5E5] rounded-lg bg-white overflow-hidden shadow-sm">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1, item.selectedSize)}
                          className="p-1 text-black hover:bg-[#F7F7F7]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-black">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                          className="p-1 text-black hover:bg-[#F7F7F7]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                    className="absolute top-3 right-3 text-[#666666] hover:text-black transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-[#F7F7F7] border-t border-[#E5E5E5] space-y-4">
              
              {/* Coupon Box */}
              <div className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#666666]">
                      <Tag className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon Code (e.g. ANXMART100)"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E5E5] rounded-xl text-xs text-black uppercase placeholder:normal-case placeholder:text-[#666666]/70 focus:outline-none focus:border-black"
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-black text-white font-bold text-xs rounded-xl hover:bg-[#222222] transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedDiscount > 0 && (
                  <p className="text-[11px] text-emerald-600 font-bold">✓ Coupon applied: ₹{appliedDiscount} OFF</p>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 font-medium">{couponError}</p>
                )}
              </div>

              {/* Bill Details */}
              <div className="space-y-2 text-xs pt-3 border-t border-[#E5E5E5]">
                <div className="flex justify-between text-[#666666]">
                  <span>Subtotal:</span>
                  <span className="font-bold text-black">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#666666]">
                  <span>Delivery Fee:</span>
                  <span className="font-bold text-black">
                    {deliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${deliveryFee}`}
                  </span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount:</span>
                    <span className="font-bold">-₹{totalDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-black pt-2 border-t border-[#E5E5E5]">
                  <span>Total Amount:</span>
                  <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout(subtotal, totalDiscount, finalTotal);
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-black hover:bg-[#222222] text-white font-bold text-xs shadow-md transition-all"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
