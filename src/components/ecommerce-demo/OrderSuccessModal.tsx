import React from 'react';
import { CheckCircle2, Package, Truck, ArrowRight, X } from 'lucide-react';
import { Order } from './types';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  onViewOrders: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose, onViewOrders }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white border border-[#E5E5E5] rounded-3xl shadow-2xl overflow-hidden text-black p-6 sm:p-8 text-center space-y-6">
        
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-[#F7F7F7] border border-[#E5E5E5] flex items-center justify-center mx-auto text-black shadow-sm">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-black text-white font-extrabold text-xs tracking-wider uppercase">
            ORDER PLACED SUCCESSFULLY
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-black">Thank You for Your Order!</h2>
          <p className="text-xs text-[#666666]">
            Your simulated order has been placed securely and is being processed by ANX Mart.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-[#F7F7F7] p-4 rounded-2xl border border-[#E5E5E5] text-left space-y-3 text-xs">
          <div className="flex justify-between border-b border-[#E5E5E5] pb-2">
            <span className="text-[#666666]">Order ID:</span>
            <span className="font-bold text-black">{order.orderId}</span>
          </div>
          <div className="flex justify-between border-b border-[#E5E5E5] pb-2">
            <span className="text-[#666666]">Estimated Delivery:</span>
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" />
              {order.estimatedDelivery}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#E5E5E5] pb-2">
            <span className="text-[#666666]">Payment Mode:</span>
            <span className="font-bold text-black uppercase">{order.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#666666]">Total Amount:</span>
            <span className="font-bold text-black">₹{order.totalAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-[#F7F7F7] border border-[#E5E5E5] text-black font-bold text-xs hover:bg-[#E5E5E5] transition-colors"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => {
              onClose();
              onViewOrders();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-black hover:bg-[#222222] text-white font-bold text-xs shadow-md transition-all"
          >
            <Package className="w-4 h-4" />
            <span>Track Order</span>
          </button>
        </div>

      </div>
    </div>
  );
};
