import React, { useState, useEffect } from "react";
import { Sparkles, ArrowLeft, Phone, Calendar, Menu, X, Heart } from "lucide-react";

interface BeautyNavbarProps {
  onBackToAgency: () => void;
  onOpenBooking: (preselectedPackage?: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

export function BeautyNavbar({
  onBackToAgency,
  onOpenBooking,
  onScrollToSection,
}: BeautyNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", target: "services" },
    { label: "Bridal Packages", target: "packages" },
    { label: "Bridal Gallery", target: "gallery" },
    { label: "Why Us", target: "why-us" },
    { label: "Testimonials", target: "testimonials" },
    { label: "Book Consultation", target: "booking" },
  ];

  return (
    <>
      {/* Top ANX Demo Announcement Bar */}
      <div className="bg-[#1a1412] text-[#e8d5c4] py-2 px-4 text-xs tracking-wider border-b border-[#3d2f28] flex items-center justify-between z-50 relative">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#34241b] text-[#f4d4ba] font-semibold text-[11px] border border-[#523c2e]">
              <Sparkles className="w-3 h-3 text-[#f4d4ba]" />
              LIVE CLIENT DEMO
            </span>
            <span className="hidden sm:inline text-[#c9b5a4] text-xs">
              Luxury Bridal Beauty Salon & Couture Makeup Studio
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
            className="inline-flex items-center gap-1.5 text-xs text-[#f4d4ba] hover:text-white transition-colors group cursor-pointer bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to ANX Site</span>
          </button>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#faf8f5]/95 backdrop-blur-md shadow-[0_4px_25px_rgba(40,25,15,0.08)] py-3 border-b border-[#ebdcd0]"
            : "bg-[#fdfcf9] py-5 border-b border-[#f0e6dd]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => onScrollToSection("hero")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#3a2820] to-[#694838] flex items-center justify-center text-[#f4d4ba] shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-[#f4d4ba]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif tracking-[0.25em] text-xl font-bold text-[#231815] uppercase">
                  BEAUTY DEMO
                </span>
              </div>
              <span className="block text-[10px] tracking-[0.3em] text-[#8a6e5b] uppercase font-medium">
                HAUTE COUTURE BRIDAL STUDIO
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide text-[#4a3b32]">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => onScrollToSection(link.target)}
                className="hover:text-[#a8744f] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#a8744f] hover:after:w-full after:transition-all cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:+15553829000"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#664b3c] hover:text-[#231815] px-3 py-2 rounded-full border border-[#dfcebf] hover:border-[#bfa996] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#a8744f]" />
              <span>(555) 382-9000</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8f5e3b] to-[#b37a51] hover:from-[#7a4e2f] hover:to-[#9c6640] text-white text-xs font-semibold tracking-wider uppercase px-5 py-2.5 rounded-full shadow-[0_4px_15px_rgba(143,94,59,0.3)] hover:shadow-[0_6px_20px_rgba(143,94,59,0.4)] transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#4a3b32] hover:bg-[#f2e7de] transition-colors cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#fdfbf7] border-b border-[#e8d8cb] px-6 py-6 space-y-4 shadow-xl">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => {
                    onScrollToSection(link.target);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-[#3d2f28] font-medium py-2 border-b border-[#f0e4d8] hover:text-[#a8744f] transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  onOpenBooking();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#8f5e3b] text-white font-semibold text-sm py-3 rounded-full shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Bridal Consultation</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onBackToAgency) {
                    onBackToAgency();
                  } else {
                    window.location.href = window.location.origin + window.location.pathname;
                  }
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#f0e4d8] text-[#543d30] font-medium text-xs py-2.5 rounded-full cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to ANX Site</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
