import React from "react";
import {
  ShoppingBag,
  Phone,
  MessageCircle,
  Instagram,
  Menu,
  X,
  Flame,
  Search,
  ArrowLeft,
  Sparkles,
  MapPin,
  Clock,
} from "lucide-react";
import { FoodCategory } from "../../types";

interface FoodNavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  selectedCategory: FoodCategory;
  onSelectCategory: (category: FoodCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onBackToAgency: () => void;
}

export function FoodNavbar({
  cartCount,
  onOpenCart,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onBackToAgency,
}: FoodNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Top ANX Demo Banner */}
      <div className="bg-gradient-to-r from-purple-900/90 via-slate-900 to-blue-900/90 border-b border-purple-500/30 px-3 py-2 text-center text-xs text-slate-200 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="hidden sm:flex items-center gap-2 mx-auto sm:mx-0">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            DEMO SHOWCASE
          </span>
          <span className="text-slate-300">
            Interactive Restaurant Website built by <strong className="text-purple-300">ANX</strong>
          </span>
        </div>

        <button
          onClick={() => {
            if (onBackToAgency) {
              onBackToAgency();
            } else {
              window.location.href = window.location.origin + window.location.pathname;
            }
          }}
          className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-sm cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to ANX Site</span>
        </button>
      </div>

      {/* Main Restaurant Sticky Header */}
      <header className="sticky top-[37px] z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/80 shadow-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div
            onClick={() => scrollTo("food-hero")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 p-0.5 shadow-[0_0_20px_rgba(245,158,11,0.35)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-amber-400">
                <Flame className="w-5 h-5 fill-amber-500 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  DESI CRAVE
                </span>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 px-1.5 py-0.2 rounded border border-amber-500/30">
                  STREET FOOD
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-medium tracking-wide">
                Authentic Taste • Sizzling Fresh
              </p>
            </div>
          </div>

          {/* Search bar on desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-xs mx-4 relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search burgers, momos, pizza..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-zinc-300">
            <button
              onClick={() => scrollTo("food-hero")}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo("food-menu")}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Full Menu
            </button>
            <button
              onClick={() => scrollTo("food-about")}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Our Story
            </button>
            <button
              onClick={() => scrollTo("food-contact")}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Location & Hours
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2.5">
            {/* Quick Call */}
            <a
              href="tel:+917348382816"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 transition-colors"
              title="Call Kitchen"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call Now</span>
            </a>

            {/* Quick WhatsApp */}
            <a
              href="https://wa.me/917348382816?text=Hi%20Desi%20Crave,%20I%20would%20like%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/30 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-zinc-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-300 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all cursor-pointer active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 fill-zinc-950" />
              <span className="font-extrabold">Cart</span>
              {cartCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-zinc-950 text-amber-400">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-5 py-4 flex flex-col gap-3 animate-in slide-in-from-top-2 duration-200">
            <div className="relative mb-2">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search burgers, momos, pizza..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
              />
            </div>

            <button
              onClick={() => scrollTo("food-hero")}
              className="text-left py-2 text-sm font-semibold text-zinc-200 hover:text-amber-400"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo("food-menu")}
              className="text-left py-2 text-sm font-semibold text-zinc-200 hover:text-amber-400"
            >
              Explore Menu
            </button>
            <button
              onClick={() => scrollTo("food-about")}
              className="text-left py-2 text-sm font-semibold text-zinc-200 hover:text-amber-400"
            >
              About Our Kitchen
            </button>
            <button
              onClick={() => scrollTo("food-contact")}
              className="text-left py-2 text-sm font-semibold text-zinc-200 hover:text-amber-400"
            >
              Location & Contact
            </button>

            <div className="pt-2 border-t border-zinc-800 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onBackToAgency) {
                    onBackToAgency();
                  } else {
                    window.location.href = window.location.origin + window.location.pathname;
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-purple-600/30 text-purple-200 border border-purple-500/40 hover:bg-purple-600 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to ANX Site</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+917348382816"
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-bold bg-zinc-900 border border-zinc-700 text-white"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call Now</span>
                </a>
                <a
                  href="https://wa.me/917348382816"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-bold bg-emerald-950 border border-emerald-500/40 text-emerald-300"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
