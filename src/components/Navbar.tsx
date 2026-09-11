import React, { useState, useEffect } from "react";
import { Phone, MessageCircle, Menu, X, Sparkles, ArrowRight, Utensils } from "lucide-react";

interface NavbarProps {
  onOpenDemo: () => void;
  onOpenContact: () => void;
}

export function Navbar({ onOpenDemo, onOpenContact }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-auto ${
        scrolled
          ? "bg-[#06070a]/90 backdrop-blur-xl border-b border-purple-500/20 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600/80 via-indigo-600/60 to-blue-600/80 p-[1px] shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] transition-all">
            <div className="w-full h-full bg-[#08090e] rounded-[11px] flex items-center justify-center">
              <span className="font-black text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-blue-300">
                ANX
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-purple-300 transition-colors">
                ANX
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-purple-950/80 text-purple-300 border border-purple-500/30">
                PRO
              </span>
            </div>
            <span className="text-[10px] tracking-wider uppercase text-slate-400 font-medium -mt-0.5">
              Website Services
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-950/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-purple-500/20 shadow-inner">
          <button
            onClick={() => scrollToSection("home")}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors rounded-full hover:bg-white/5 cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("slider-showcase")}
            className="px-3.5 py-1.5 text-xs font-bold text-purple-300 hover:text-purple-200 transition-colors rounded-full hover:bg-purple-500/15 cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
            <span>3D Slider</span>
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors rounded-full hover:bg-white/5 cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors rounded-full hover:bg-white/5 cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors rounded-full hover:bg-white/5 cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-2.5">
          <a
            href="tel:+917348382816"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/60 hover:border-purple-500/40 transition-all hover:text-white"
            title="Call +91 7348382816"
          >
            <Phone className="w-3.5 h-3.5 text-purple-400" />
            <span>Call Now</span>
          </a>

          <a
            href="https://wa.me/917348382816?text=Hi%20ANX,%20I%20am%20interested%20in%20your%20website%20development%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 transition-all"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={onOpenDemo}
            className="relative group overflow-hidden px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-[0_0_20px_rgba(147,51,234,0.35)] hover:shadow-[0_0_28px_rgba(147,51,234,0.6)] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-200 animate-pulse" />
            <span>Get Free Demo</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 mx-4 p-5 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-purple-500/30 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => scrollToSection("home")}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/5"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("slider-showcase")}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-bold text-purple-300 hover:bg-purple-500/10 flex items-center justify-between"
            >
              <span>3D Dynamic Slider</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500 text-white font-black">
                3D
              </span>
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/5"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/5"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/5"
            >
              Contact
            </button>
          </div>

          <div className="h-[1px] bg-slate-800/80 my-1" />

          <div className="grid grid-cols-2 gap-2">
            <a
              href="tel:+917348382816"
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-semibold bg-slate-900 border border-purple-500/20 text-slate-200"
            >
              <Phone className="w-4 h-4 text-purple-400" />
              <span>Call</span>
            </a>
            <a
              href="https://wa.me/917348382816"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-semibold bg-emerald-950/50 border border-emerald-500/30 text-emerald-300"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDemo();
            }}
            className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center gap-2 shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            <span>Get Free Demo</span>
          </button>
        </div>
      )}
    </header>
  );
}
