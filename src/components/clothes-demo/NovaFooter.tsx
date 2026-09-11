import React, { useState } from "react";
import { Sparkles, ArrowUp, Send, Check, ShieldCheck, ArrowLeft } from "lucide-react";
import { ProductCategory } from "./types";

interface NovaFooterProps {
  onScrollToTop: () => void;
  onSelectCategory: (cat: ProductCategory) => void;
  onScrollToSection: (sectionId: string) => void;
  onBackToAgency: () => void;
}

export function NovaFooter({
  onScrollToTop,
  onSelectCategory,
  onScrollToSection,
  onBackToAgency,
}: NovaFooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#050507] text-white border-t border-white/10 relative overflow-hidden">
      {/* Return to Agency Banner */}
      <div className="bg-gradient-to-r from-purple-950/60 via-zinc-950 to-purple-950/60 border-b border-purple-500/20 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Currently Viewing: <strong>NOVA WEAR</strong> Fashion Store E-Commerce Demo</span>
          </div>

          <button
            onClick={onBackToAgency}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to ANX Agency Main Website</span>
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-5">
            <div className="flex flex-col items-start cursor-pointer" onClick={onScrollToTop}>
              <span className="text-3xl font-serif tracking-[0.25em] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-amber-200">
                NOVA WEAR
              </span>
              <span className="text-[10px] tracking-[0.35em] text-amber-400 font-medium uppercase mt-0.5">
                Haute Couture & Streetwear
              </span>
            </div>

            <p className="text-xs text-zinc-400 font-light mt-4 max-w-sm leading-relaxed">
              Handcrafting timeless silhouettes that merge European architectural tailoring with Japanese raw selvedge denim and ancient Indian imperial weaves.
            </p>

            {/* Newsletter Subscription Box */}
            <div className="mt-8">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-2">
                Join The Atelier Circle
              </span>
              <p className="text-xs text-zinc-400 font-light mb-3">
                Receive private invitations to runway capsule drops and VIP salon events.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 rounded-xl">
                  <Check className="w-4 h-4" />
                  <span>Welcome to The Atelier Circle. Check your inbox.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Categories Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.25em] text-white font-bold mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              {["Women", "Men", "Streetwear", "Ethnic Wear", "New Arrivals"].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat as ProductCategory);
                      onScrollToSection("nova-products");
                    }}
                    className="hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onScrollToSection("nova-offers")}
                  className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer font-medium"
                >
                  VIP Special Offers
                </button>
              </li>
            </ul>
          </div>

          {/* Client Services */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.25em] text-white font-bold mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => onScrollToSection("nova-contact")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Book Private Fitting
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("nova-contact")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bespoke Alterations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("nova-about")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sustainable Materials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("nova-lookbook")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Runway Lookbook
                </button>
              </li>
              <li>
                <span className="text-zinc-500">Global Shipping & Returns</span>
              </li>
            </ul>
          </div>

          {/* Boutiques */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-white font-bold mb-4">
              Atelier Boutiques
            </h4>
            <div className="space-y-3 text-xs text-zinc-400 font-light">
              <div>
                <strong className="text-white block font-medium">Milan Flagship</strong>
                <span>Via Monte Napoleone 14, 20121 Milano</span>
              </div>
              <div>
                <strong className="text-white block font-medium">New York Showroom</strong>
                <span>740 Fifth Avenue, New York, NY 10019</span>
              </div>
              <div>
                <strong className="text-white block font-medium">New Delhi Atelier</strong>
                <span>The Chanakya, Chanakyapuri, New Delhi 110021</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span>© 2026 NOVA WEAR Haute Couture Ltd. All Rights Reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                if (onBackToAgency) {
                  onBackToAgency();
                } else {
                  window.location.href = window.location.origin + window.location.pathname;
                }
              }}
              className="text-amber-400 hover:text-amber-300 font-bold underline transition-colors cursor-pointer"
            >
              ← Back to ANX Site
            </button>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="hidden sm:inline">Designed for ANX High-Conversion Client Showcases</span>
            <button
              onClick={onScrollToTop}
              className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
