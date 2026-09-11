import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  Sparkles,
  Flame,
  ShieldCheck,
  Headphones,
  Laptop,
  Smartphone,
  Tv,
  ArrowLeft,
} from "lucide-react";
import { ElectronicsCategory } from "./types";

interface TechNovaNavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedCategory: ElectronicsCategory;
  onSelectCategory: (cat: ElectronicsCategory) => void;
  onScrollToSection: (sectionId: string) => void;
  onBackToAgency?: () => void;
}

export function TechNovaNavbar({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onScrollToSection,
  onBackToAgency,
}: TechNovaNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#07090E]/90 backdrop-blur-xl border-b border-cyan-500/20 text-white">
      {/* Top micro banner */}
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-950/90 to-cyan-950/80 border-b border-cyan-500/20 px-4 py-2 text-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-cyan-300/90 overflow-hidden">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 animate-pulse" />
          <span className="truncate">Free Worldwide Express Shipping on TechNova orders over $99 • 2-Year Hardware Warranty</span>
        </div>

        <button
          onClick={() => {
            if (onBackToAgency) {
              onBackToAgency();
            } else {
              window.location.href = window.location.origin + window.location.pathname;
            }
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-black border border-cyan-400/40 text-[11px] font-bold transition-all cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to ANX Site</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onScrollToSection("hero")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center">
              <div className="w-full h-full bg-[#090D16] rounded-[10px] flex items-center justify-center">
                <span className="font-black text-xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">
                  T⚡N
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-wider text-white">TECH</span>
                <span className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
                  NOVA
                </span>
              </div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-cyan-400/80 font-medium">Electronics Studio</p>
            </div>
          </div>

          {/* Search Bar - Interactive */}
          <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/60" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search smartphones, laptops, 4K TVs, audio..."
                className="w-full pl-10 pr-10 py-2.5 rounded-full bg-[#0F1422] border border-cyan-500/30 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
              />
              {searchTerm && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Navigation & Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Quick Links on desktop */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300 mr-2">
              <button
                onClick={() => onScrollToSection("categories")}
                className="hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Categories
              </button>
              <button
                onClick={() => onScrollToSection("deals")}
                className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold transition-colors cursor-pointer"
              >
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Deals</span>
              </button>
              <button
                onClick={() => onScrollToSection("new-arrivals")}
                className="hover:text-cyan-400 transition-colors cursor-pointer"
              >
                New Arrivals
              </button>
              <button
                onClick={() => onScrollToSection("products")}
                className="hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Catalog
              </button>
            </nav>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/60 hover:border-cyan-500/50 hover:bg-cyan-950/30 text-slate-200 hover:text-cyan-400 transition-all cursor-pointer"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-lg animate-scaleIn">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all flex items-center gap-2 cursor-pointer"
              title="View Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="min-w-[20px] h-5 px-1 rounded-full bg-white text-cyan-950 text-xs font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/60" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search devices, 4K TVs, laptops..."
              className="w-full pl-10 pr-10 py-2 rounded-full bg-[#0F1422] border border-cyan-500/30 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-cyan-500/20 py-4 space-y-3 bg-[#07090E]/95 backdrop-blur-2xl px-2 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  onScrollToSection("hero");
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-slate-900/60 text-left text-slate-200 hover:bg-cyan-950/50"
              >
                Home
              </button>
              <button
                onClick={() => {
                  onScrollToSection("deals");
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-amber-950/40 text-left text-amber-300 font-semibold hover:bg-amber-900/40 flex items-center gap-1.5"
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Today's Deals
              </button>
              <button
                onClick={() => {
                  onScrollToSection("categories");
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-slate-900/60 text-left text-slate-200 hover:bg-cyan-950/50"
              >
                Categories
              </button>
              <button
                onClick={() => {
                  onScrollToSection("new-arrivals");
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-slate-900/60 text-left text-slate-200 hover:bg-cyan-950/50"
              >
                New Arrivals
              </button>
              <button
                onClick={() => {
                  onScrollToSection("products");
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-slate-900/60 text-left text-slate-200 hover:bg-cyan-950/50 col-span-2"
              >
                Full Product Catalog
              </button>
              <button
                onClick={() => {
                  onScrollToSection("why-us");
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-slate-900/60 text-left text-slate-200 hover:bg-cyan-950/50 col-span-2"
              >
                Why Choose TechNova
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onBackToAgency) {
                    onBackToAgency();
                  } else {
                    window.location.href = window.location.origin + window.location.pathname;
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-900/80 to-cyan-950/90 text-white text-xs font-bold border border-cyan-500/40 hover:border-cyan-400 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
                <span>Back to ANX Site</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
