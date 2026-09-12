import React from 'react';
import { Package, Truck, CheckCircle2, Clock, ArrowLeft, Store } from 'lucide-react';
import { Order } from './types';

interface OrdersPageProps {
  orders: Order[];
  onBackToStore: () => void;
  onBackToAgency: () => void;
}

export const OrdersPage: React.FC<OrdersPageProps> = ({ orders, onBackToStore, onBackToAgency }) => {
  const stages: Order['status'][] = ['Order Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];

  return (
    <div className="min-h-screen bg-white text-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToStore}
              className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl bg-[#F7F7F7] border border-[#E5E5E5] text-black hover:bg-[#E5E5E5] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Store</span>
            </button>
            <button
              onClick={onBackToAgency}
              className="flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl bg-black text-white hover:bg-[#222222] transition-colors"
            >
              <span>ANX Agency</span>
            </button>
          </div>

          <h1 className="text-xl sm:text-2xl font-black tracking-wider text-black">
            MY ORDERS & TRACKER
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-24 bg-[#F7F7F7] rounded-3xl border border-[#E5E5E5] p-8 space-y-4">
            <div className="w-20 h-20 rounded-full bg-white border border-[#E5E5E5] flex items-center justify-center mx-auto text-black">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg text-black">No active orders found</h3>
            <p className="text-xs text-[#666666] max-w-sm mx-auto">
              Place a demo order from ANX Mart to track delivery status in real time.
            </p>
            <button
              onClick={onBackToStore}
              className="px-6 py-3 rounded-xl bg-black text-white font-bold text-xs shadow-md"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const currentStageIndex = stages.indexOf(order.status);

              return (
                <div key={order.orderId} className="bg-white border border-[#E5E5E5] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                  
                  {/* Order Meta Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5]">
                    <div>
                      <span className="text-xs text-[#666666]">Order ID: <strong className="text-black">{order.orderId}</strong></span>
                      <p className="text-[11px] text-[#666666] mt-0.5">Placed on {order.orderDate}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-black">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                      <p className="text-[11px] text-emerald-600 font-bold">{order.paymentMethod.toUpperCase()} • Paid</p>
                    </div>
                  </div>

                  {/* Items List Preview */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-black uppercase tracking-wider">Ordered Items</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-[#F7F7F7] p-3 rounded-xl border border-[#E5E5E5]">
                          <img src={item.product.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-white border border-[#E5E5E5]" />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-bold text-xs text-black truncate">{item.product.name}</h5>
                            <p className="text-[11px] text-[#666666]">Qty: {item.quantity} {item.selectedSize ? `• Size: ${item.selectedSize}` : ''}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual Order Tracker */}
                  <div className="pt-6 border-t border-[#E5E5E5] space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-2">
                        <Truck className="w-4 h-4 text-black" />
                        <span>Delivery Tracker</span>
                      </h4>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        Estimated: {order.estimatedDelivery}
                      </span>
                    </div>

                    {/* Progress Steps */}
                    <div className="grid grid-cols-5 gap-2 pt-2">
                      {stages.map((stage, idx) => {
                        const isCompleted = idx <= currentStageIndex;
                        const isCurrent = idx === currentStageIndex;

                        return (
                          <div key={stage} className="flex flex-col items-center text-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-all ${
                              isCompleted
                                ? 'bg-black text-white shadow-sm'
                                : 'bg-[#F7F7F7] border border-[#E5E5E5] text-[#666666]'
                            }`}>
                              {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                            </div>
                            <span className={`text-[10px] sm:text-xs font-semibold ${isCurrent ? 'text-black font-bold' : 'text-[#666666]'}`}>
                              {stage}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
