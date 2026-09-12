import React, { useState } from 'react';
import { X, CreditCard, Truck, CheckCircle2, ShieldCheck, QrCode, ArrowRight, Lock } from 'lucide-react';
import { CartItem, Order } from './types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotal: number;
  discount: number;
  totalAmount: number;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  discount,
  totalAmount,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState<string>('Rahul Sharma');
  const [phone, setPhone] = useState<string>('9876543210');
  const [street, setStreet] = useState<string>('Flat 402, Royale Residency, MG Road');
  const [city, setCity] = useState<string>('Bengaluru, Karnataka');
  const [pincode, setPincode] = useState<string>('560001');

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod'>('upi');
  const [upiId, setUpiId] = useState<string>('rahul@okaxis');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newOrder: Order = {
        orderId: `ANX-${Math.floor(100000 + Math.random() * 900000)}`,
        items: cartItems,
        totalAmount,
        paymentMethod,
        address: { fullName, phone, street, city, pincode },
        orderDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        estimatedDelivery: cartItems.some(i => i.product.isFastDelivery) ? '15-30 Minutes' : '1-2 Days',
        status: 'Order Placed',
      };
      onOrderSuccess(newOrder);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-[#E5E5E5] rounded-3xl shadow-2xl overflow-hidden text-black my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#F7F7F7] border-b border-[#E5E5E5]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-black" />
            <h3 className="font-black text-sm uppercase tracking-wider">Secure Checkout — ANX Mart</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white border border-[#E5E5E5] text-black hover:bg-black hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Delivery Address Section */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-black uppercase tracking-widest flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span>1. Delivery Address</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-[#666666] block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl text-sm text-black focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[#666666] block mb-1">Mobile Number</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl text-sm text-black focus:outline-none focus:border-black"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-[#666666] block mb-1">Street Address / Landmark</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl text-sm text-black focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[#666666] block mb-1">City & State</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl text-sm text-black focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[#666666] block mb-1">Pincode</label>
                <input
                  type="text"
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl text-sm text-black focus:outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-3 pt-4 border-t border-[#E5E5E5]">
            <h4 className="text-xs font-bold text-black uppercase tracking-widest">2. Order Summary</h4>
            <div className="bg-[#F7F7F7] p-4 rounded-2xl border border-[#E5E5E5] space-y-2 text-xs">
              <div className="flex justify-between text-[#666666]">
                <span>Items Count:</span>
                <span className="font-bold text-black">{cartItems.reduce((acc, i) => acc + i.quantity, 0)} items</span>
              </div>
              <div className="flex justify-between text-[#666666]">
                <span>Subtotal:</span>
                <span className="font-bold text-black">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount:</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-black pt-2 border-t border-[#E5E5E5]">
                <span>Total Payable:</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-4 pt-4 border-t border-[#E5E5E5]">
            <h4 className="text-xs font-bold text-black uppercase tracking-widest flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>3. Payment Method</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* UPI Option */}
              <div
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                  paymentMethod === 'upi'
                    ? 'bg-black text-white border-black shadow-md'
                    : 'bg-[#F7F7F7] border-[#E5E5E5] text-black hover:border-black'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === 'upi' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm">UPI / QR Code</h5>
                  <p className={`text-[11px] ${paymentMethod === 'upi' ? 'text-gray-300' : 'text-[#666666]'}`}>GPay, PhonePe, Paytm, BHIM</p>
                </div>
              </div>

              {/* COD Option */}
              <div
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                  paymentMethod === 'cod'
                    ? 'bg-black text-white border-black shadow-md'
                    : 'bg-[#F7F7F7] border-[#E5E5E5] text-black hover:border-black'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === 'cod' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm">Cash on Delivery</h5>
                  <p className={`text-[11px] ${paymentMethod === 'cod' ? 'text-gray-300' : 'text-[#666666]'}`}>Pay when order arrives</p>
                </div>
              </div>

            </div>

            {paymentMethod === 'upi' && (
              <div className="p-4 rounded-2xl bg-[#F7F7F7] border border-[#E5E5E5] space-y-3">
                <label className="text-xs font-semibold text-black block">Enter UPI ID (Mock Demo)</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g. username@oksbi"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E5E5E5] rounded-xl text-sm text-black focus:outline-none focus:border-black"
                />
                <p className="text-[11px] text-[#666666]">
                  ℹ️ This is a secure portfolio demo. No real banking credentials or charges apply.
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-black hover:bg-[#222222] text-white font-bold text-sm shadow-md transition-all transform active:scale-95 disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Simulating Secure Payment...</span>
              </div>
            ) : (
              <>
                <span>Place Order (₹{totalAmount.toLocaleString('en-IN')})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};
