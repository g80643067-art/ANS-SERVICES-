import React, { useState } from "react";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  ArrowLeft,
  Sparkles,
  Phone,
  ShieldCheck,
  ChevronDown
} from "lucide-react";
import { ProductCategory } from "./types";

interface NovaNavbarProps {
  onBackToAgency: () => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onScrollToSection: (sectionId: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function NovaNavbar({
  onBackToAgency,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  activeCategory,
  onSelectCategory,
  onScrollToSection,
  searchQuery,
  onSearchChange,
}: NovaNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const categories: { label: string; value: ProductCategory }[] = [
    { label: "All Collections", value: "All" },
    { label: "Women", value: "Women" },
    { label: "Men", value: "Men" },
    { label: "Streetwear", value: "Streetwear" },
    { label: "Ethnic Wear", value: "Ethnic Wear" },
    { label: "New Arrivals", value: "New Arrivals" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0d0d0f]/95 backdrop-blur-md border-b border-white/10 text-white transition-all">
      {/* Top Announcement & Return Bar */}
      <div className="bg-gradient-to-r from-amber-600/90 via-amber-500/90 to-amber-700/90 text-zinc-950 text-xs font-semibold px-4 py-2 flex items-center justify-between shadow-sm">
        <div className="hidden sm:flex items-center gap-2 tracking-widest text-[11px] uppercase font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Complimentary Worldwide Express Shipping on Orders Over $200 • Code: NOVA25</span>
        </div>

        <div className="sm:hidden text-[10px] uppercase font-bold tracking-wider truncate">
          Complimentary Worldwide Shipping • 25% Off Code: NOVA25
        </div>

        <button
          onClick={() => {
            if (onBackToAgency) {
              onBackToAgency();
            } else {
              window.location.href = window.location.origin + window.location.pathname;
            }
          }}
          id="nova-return-agency-btn"
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/80 hover:bg-zinc-950 text-amber-300 hover:text-white transition-all text-[11px] font-bold cursor-pointer shrink-0 ml-2"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Back to ANX Site</span>
        </button>
      </div>

      {/* Main Luxury Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Luxury Brand Logo */}
          <div className="flex flex-col items-center lg:items-start cursor-pointer" onClick={() => onScrollToSection("nova-hero")}>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-serif tracking-[0.25em] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-amber-200">
                NOVA WEAR
              </span>
            </div>
            <span className="text-[9px] tracking-[0.35em] text-amber-400/90 font-medium uppercase -mt-0.5">
              Haute Couture & Streetwear
            </span>
          </div>

          {/* Desktop Categories Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  onSelectCategory(cat.value);
                  onScrollToSection("nova-products");
                }}
                className={`px-3 py-1.5 text-xs font-medium tracking-wider uppercase transition-all cursor-pointer rounded-md ${
                  activeCategory === cat.value
                    ? "text-amber-300 bg-white/5 font-semibold"
                    : "text-zinc-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
            <div className="w-[1px] h-4 bg-white/15 mx-1" />
            <button
              onClick={() => onScrollToSection("nova-offers")}
              className="px-3 py-1.5 text-xs font-medium tracking-wider uppercase text-amber-400 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Offers</span>
            </button>
            <button
              onClick={() => onScrollToSection("nova-lookbook")}
              className="px-3 py-1.5 text-xs font-medium tracking-wider uppercase text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              Lookbook
            </button>
            <button
              onClick={() => onScrollToSection("nova-about")}
              className="px-3 py-1.5 text-xs font-medium tracking-wider uppercase text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              Atelier
            </button>
            <button
              onClick={() => onScrollToSection("nova-contact")}
              className="px-3 py-1.5 text-xs font-medium tracking-wider uppercase text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              Concierge
            </button>
          </nav>

          {/* Right Action Icons: Search, Wishlist, Cart */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Toggle */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center bg-zinc-900 border border-white/20 rounded-full px-3 py-1.5 text-sm w-44 sm:w-64 transition-all">
                  <Search className="w-4 h-4 text-zinc-400 shrink-0 mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search gowns, jackets, silk..."
                    className="bg-transparent border-none outline-none text-white text-xs w-full placeholder-zinc-500"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      onSearchChange("");
                    }}
                    className="text-zinc-400 hover:text-white ml-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
                  aria-label="Search collection"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist Button with Badge */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-colors relative cursor-pointer"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Shopping Bag Button with Badge */}
            <button
              onClick={onOpenCart}
              id="nova-cart-btn"
              className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 rounded-full font-bold text-xs transition-all shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] cursor-pointer"
              aria-label="Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-zinc-950 text-amber-300 border border-amber-400 text-[9px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Bag {cartCount > 0 ? `(${cartCount})` : ""}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top duration-200">
          <div className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">
            Categories
          </div>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  onSelectCategory(cat.value);
                  onScrollToSection("nova-products");
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
                  activeCategory === cat.value
                    ? "bg-amber-400/10 text-amber-300 font-semibold border border-amber-400/20"
                    : "text-zinc-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4 flex flex-col space-y-2">
            <button
              onClick={() => {
                onScrollToSection("nova-offers");
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-sm text-amber-300 font-semibold flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Runway Special Offers (25% OFF)</span>
            </button>
            <button
              onClick={() => {
                onScrollToSection("nova-lookbook");
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-sm text-zinc-300 hover:text-white"
            >
              Fashion Lookbook & Runway
            </button>
            <button
              onClick={() => {
                onScrollToSection("nova-about");
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-sm text-zinc-300 hover:text-white"
            >
              About The Atelier
            </button>
            <button
              onClick={() => {
                onScrollToSection("nova-contact");
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-sm text-zinc-300 hover:text-white"
            >
              VIP Concierge & Styling
            </button>

            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onBackToAgency) {
                    onBackToAgency();
                  } else {
                    window.location.href = window.location.origin + window.location.pathname;
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-black transition-colors text-xs font-bold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to ANX Site</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
