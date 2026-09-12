import React from 'react';
import { Zap, ShieldCheck, Truck, ArrowRight, Sparkles } from 'lucide-react';
import { ProductCategory } from './types';

interface HeroBannerProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectCategory }) => {
  return (
    <div className="relative overflow-hidden bg-[#F7F7F7] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Column - Promotional Text */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E5E5] text-black text-xs font-bold tracking-wider uppercase shadow-sm">
            <Sparkles className="w-4 h-4 text-black" />
            <span>India's Mega E-Commerce Demo</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-black leading-tight">
            Everything You Need, <br />
            <span className="underline decoration-2 underline-offset-4">
              Delivered Instantly.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#666666] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
            Explore ANX Mart featuring Groceries in <span className="text-black font-bold">10-30 minutes</span>, Luxury Fashion, cutting-edge Electronics, and Professional Digital Assets with 3D product previews.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={() => onSelectCategory('groceries')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-black text-white font-bold text-xs hover:bg-[#222222] transition-all transform hover:scale-105 shadow-md"
            >
              <Zap className="w-4 h-4 text-white fill-white" />
              <span>Shop Groceries (10-30m)</span>
            </button>

            <button
              onClick={() => onSelectCategory('fashion')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-[#E5E5E5] text-black font-bold text-xs hover:bg-[#F0F0F0] transition-all shadow-sm"
            >
              <span>Explore Fashion</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Feature Badges */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E5E5E5] text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E5E5] flex items-center justify-center text-black shadow-sm">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-black uppercase">10–30 Min</h4>
                <p className="text-[11px] text-[#666666]">Grocery Delivery</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E5E5] flex items-center justify-center text-black shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-black uppercase">100% Secure</h4>
                <p className="text-[11px] text-[#666666]">UPI & COD Checkout</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E5E5] flex items-center justify-center text-black shadow-sm">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-black uppercase">Free Delivery</h4>
                <p className="text-[11px] text-[#666666]">On Orders Over ₹499</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Hero Banner Image Card */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl overflow-hidden border border-[#E5E5E5] shadow-lg bg-white group">
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000&auto=format&fit=crop"
              alt="ANX Mart Mega Sale"
              className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <span className="px-3 py-1 rounded-md bg-white text-black font-extrabold text-xs uppercase tracking-wider shadow">
                Mega Festive Deal
              </span>
              <h3 className="text-2xl font-black text-white">Up to 60% OFF on Electronics & Fashion</h3>
              <p className="text-xs text-[#E5E5E5]">Instant UPI cashback & lightning fast delivery guaranteed.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
