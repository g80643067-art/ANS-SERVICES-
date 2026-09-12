import React, { useState } from 'react';
import { ShoppingCart, Heart, User, Search, Package, ArrowLeft, Store, Menu, X, Zap } from 'lucide-react';
import { ProductCategory } from './types';

interface HeaderProps {
  onBackToAgency: () => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenOrders: () => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onBackToAgency,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenOrders,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] text-black shadow-sm">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Back to Agency */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={onBackToAgency}
              className="flex items-center gap-1 sm:gap-2 text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-full bg-black text-white hover:bg-[#222222] transition-all shadow-sm"
              title="Return to ANX Agency"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="text-[11px] sm:text-xs">ANX Agency</span>
            </button>

            <div 
              onClick={() => { onSelectCategory('all'); onSearchChange(''); }}
              className="cursor-pointer flex items-center gap-2"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black flex items-center justify-center text-white shadow-md">
                <Store className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-black tracking-wider text-black">
                  ANX MART
                </h1>
                <p className="text-[9px] sm:text-[10px] tracking-widest text-[#666666] font-bold uppercase -mt-0.5">
                  E-Commerce Demo
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#666666]">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search for products, brands and more"
                className="w-full pl-10 pr-4 py-2.5 bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl text-sm text-black placeholder-[#666666]/70 focus:outline-none focus:border-black transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#666666] hover:text-black text-xs font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={onOpenOrders}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-black bg-[#F7F7F7] border border-[#E5E5E5] hover:bg-[#E5E5E5] transition-colors"
            >
              <Package className="w-4 h-4 text-black" />
              <span>Orders</span>
            </button>

            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-xl bg-[#F7F7F7] border border-[#E5E5E5] text-black hover:bg-[#E5E5E5] transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-black text-white text-[11px] font-bold flex items-center justify-center shadow">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white font-bold text-xs hover:bg-[#222222] transition-all shadow-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-white text-black text-xs font-black">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-[#F7F7F7] border border-[#E5E5E5] text-black"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#666666]">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for products, brands..."
              className="w-full pl-10 pr-4 py-2 bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl text-sm text-black placeholder-[#666666]/70 focus:outline-none focus:border-black"
            />
          </div>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="bg-[#F7F7F7] border-t border-[#E5E5E5] overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 sm:gap-6 py-2.5 whitespace-nowrap">
          {[
            { id: 'all', label: 'All Products', icon: Store },
            { id: 'groceries', label: 'Groceries (10-30m)', icon: Zap },
            { id: 'fashion', label: 'Clothes & Fashion', icon: User },
            { id: 'digital', label: 'Digital Products', icon: Package },
            { id: 'electronics', label: 'Electronics', icon: Zap },
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as ProductCategory)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-black text-white shadow-sm'
                    : 'text-[#666666] hover:text-black hover:bg-[#E5E5E5]/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#666666]'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E5E5E5] p-4 space-y-3 animate-fade-in shadow-lg">
          <button
            onClick={() => { setMobileMenuOpen(false); onBackToAgency(); }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-black text-white font-bold text-xs"
          >
            <span className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Return to ANX Agency
            </span>
            <span>→</span>
          </button>
          
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E5E5E5]">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenOrders(); }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#F7F7F7] border border-[#E5E5E5] text-black font-bold text-xs"
            >
              <Package className="w-4 h-4" />
              <span>My Orders</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenWishlist(); }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#F7F7F7] border border-[#E5E5E5] text-black font-bold text-xs"
            >
              <Heart className="w-4 h-4" />
              <span>Wishlist ({wishlistCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
