import React, { useState } from "react";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu as MenuIcon,
  X,
  Cake,
  Clock,
  MapPin,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

interface SweetCrustNavbarProps {
  cartCount: number;
  wishlistCount: number;
  cartSubtotal: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigateSection: (sectionId: string) => void;
  onBackToAgency?: () => void;
}

export function SweetCrustNavbar({
  cartCount,
  wishlistCount,
  cartSubtotal,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  onSearchChange,
  onNavigateSection,
  onBackToAgency,
}: SweetCrustNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const navLinks = [
    { label: "Home", id: "hero" },
    { label: "Categories", id: "categories" },
    { label: "Best Sellers", id: "best-sellers" },
    { label: "Custom Cakes", id: "custom-cakes" },
    { label: "Special Offers", id: "special-offers" },
    { label: "About Us", id: "about-us" },
    { label: "Gallery", id: "gallery" },
    { label: "Order & Contact", id: "contact" },
  ];

  const handleLinkClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#F0E6D8] shadow-xs">
      {/* Top Banner Ticker */}
      <div className="bg-[#3C2415] text-[#FDF8F3] text-xs py-1.5 px-4 border-b border-[#52331F]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="inline-flex items-center gap-1.5 font-medium tracking-wide truncate">
              <Sparkles className="w-3.5 h-3.5 text-[#E6A15C] shrink-0" />
              <span>Freshly baked from 5:00 AM daily • 100% French Normandy Butter & Wild Sourdough</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-[#D8C7B5] shrink-0">
            <span className="hidden md:flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#E6A15C]" />
              Open Daily: 7:00 AM – 9:00 PM
            </span>
            <button
              onClick={() => {
                if (onBackToAgency) {
                  onBackToAgency();
                } else {
                  window.location.href = window.location.origin + window.location.pathname;
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6A15C] text-[#3C2415] hover:bg-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to ANX Site</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <button
            onClick={() => handleLinkClick("hero")}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#9C4A1A] to-[#692E0D] text-white flex items-center justify-center shadow-md shadow-[#9C4A1A]/20 group-hover:scale-105 transition-transform duration-300">
              <Cake className="w-6 h-6 text-[#FEE6D0]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-serif font-black tracking-tight text-[#3C2415]">
                  SWEET CRUST
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C67D34]" />
              </div>
              <p className="text-[10px] font-sans font-semibold tracking-[0.2em] text-[#9C4A1A] uppercase">
                Artisan Bakehouse & Patisserie
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="px-3 py-2 rounded-lg text-xs xl:text-sm font-medium text-[#5A4333] hover:text-[#9C4A1A] hover:bg-[#F7EFE5] transition-all whitespace-nowrap cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input (Desktop) */}
            <div className="relative hidden md:block w-44 lg:w-56">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search bakes, cakes..."
                className="w-full bg-[#F5ECE1]/70 hover:bg-[#F5ECE1] focus:bg-white text-xs text-[#3C2415] placeholder-[#8A7565] pl-8 pr-3 py-2 rounded-full border border-[#E8DCCF] focus:border-[#C67D34] focus:ring-2 focus:ring-[#C67D34]/20 outline-hidden transition-all"
              />
              <Search className="w-3.5 h-3.5 text-[#8A7565] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#8A7565] hover:text-[#3C2415]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="md:hidden p-2.5 rounded-full text-[#5A4333] hover:bg-[#F7EFE5] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-full text-[#5A4333] hover:text-[#9C4A1A] hover:bg-[#F7EFE5] transition-colors cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#9C4A1A] text-white text-[10px] font-bold flex items-center justify-center shadow-xs animate-in zoom-in">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#3C2415] text-[#FDF8F3] hover:bg-[#9C4A1A] transition-all shadow-md shadow-[#3C2415]/10 cursor-pointer group"
              aria-label="View Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#FEE6D0] group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#E6A15C] text-[#3C2415] text-[10px] font-black flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#D8C7B5]">
                  Basket
                </span>
                <span className="text-xs font-bold text-white">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#3C2415] hover:bg-[#F7EFE5] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="md:hidden pb-3 pt-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search cakes, sourdough, croissants..."
                className="w-full bg-white text-sm text-[#3C2415] placeholder-[#8A7565] pl-9 pr-8 py-2.5 rounded-xl border border-[#E8DCCF] focus:border-[#C67D34] outline-hidden shadow-inner"
              />
              <Search className="w-4 h-4 text-[#8A7565] absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#8A7565]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF9] border-t border-[#F0E6D8] px-4 py-4 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-[#4A3425] hover:bg-[#F7EFE5] hover:text-[#9C4A1A] transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-[#F0E6D8] space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onBackToAgency) {
                  onBackToAgency();
                } else {
                  window.location.href = window.location.origin + window.location.pathname;
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#3C2415] text-[#FDF8F3] text-xs font-bold hover:bg-[#52331F] transition-colors shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#E6A15C]" />
              <span>Back to ANX Site</span>
            </button>
            <div className="text-xs text-[#8A7565] flex flex-col gap-1 pt-1">
              <span>📞 Call Bakehouse: +1 (555) 234-BAKE</span>
              <span>📍 42 Artisan Way, Historic Quarter</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
