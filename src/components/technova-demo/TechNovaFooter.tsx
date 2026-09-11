import React, { useState } from "react";
import {
  Sparkles,
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { ElectronicsCategory } from "./types";

interface TechNovaFooterProps {
  onSelectCategory: (cat: ElectronicsCategory) => void;
  onScrollToSection: (sectionId: string) => void;
  onBackToAgency?: () => void;
}

export function TechNovaFooter({
  onSelectCategory,
  onScrollToSection,
  onBackToAgency,
}: TechNovaFooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const faqs = [
    {
      q: "Are all TechNova devices genuine with manufacturer warranty?",
      a: "Yes. Every unit sold is 100% factory-sealed and verified with official manufacturer serial numbers, backed by our 2-Year Hardware Coverage.",
    },
    {
      q: "How fast is express delivery?",
      a: "Orders placed before 4:00 PM EST are dispatched same-day and typically arrive within 24 to 48 hours via tracked courier.",
    },
    {
      q: "What is your 30-day return policy?",
      a: "You can return any device in original packaging within 30 days for a full refund or exchange with free return shipping.",
    },
  ];

  return (
    <footer className="bg-[#05070C] text-slate-400 text-sm border-t border-cyan-500/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Newsletter Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>STAY AHEAD OF TECH INNOVATION</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Subscribe & Receive 10% Off Your First Order
            </h3>
            <p className="text-xs text-slate-300">
              Get exclusive early drop notifications, member flash sales, and teardown guides.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Thank you! Use code TECH10 at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  required
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-full sm:w-64"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                >
                  <span>Join</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <div className="w-full h-full bg-[#090D16] rounded-[10px] flex items-center justify-center font-black text-sm text-cyan-400">
                  T⚡N
                </div>
              </div>
              <div>
                <span className="text-xl font-black text-white">TECH</span>
                <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">
                  NOVA
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              TechNova is a premier consumer electronics portfolio demo showcasing next-generation smartphones, creator workstations, 4K Mini-LED entertainment, and spatial audio engineering.
            </p>

            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Innovation Way, Silicon Boulevard, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>concierge@technovademo.store</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>+1 (800) 832-4668 (Demo Support)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2 text-xs">
              {(
                [
                  "Smartphones",
                  "Laptops",
                  "Smart TVs",
                  "Tablets",
                  "Smartwatches",
                  "Headphones & Earbuds",
                  "Gaming",
                  "Accessories",
                ] as const
              ).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      onScrollToSection("products");
                    }}
                    className="hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Shop & Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onScrollToSection("deals")}
                  className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Today's Best Deals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("new-arrivals")}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  New Arrivals 2026
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("why-us")}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Why Choose Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("products")}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Full Hardware Inventory
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: FAQ Preview & Help */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>FAQ & Help</span>
            </h4>
            <div className="space-y-2">
              {faqs.map((f, i) => (
                <div key={i} className="text-xs border border-slate-800/80 rounded-xl p-2.5 bg-slate-900/50">
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full text-left font-semibold text-slate-300 hover:text-cyan-300 flex justify-between items-center cursor-pointer"
                  >
                    <span className="line-clamp-1">{f.q}</span>
                    <span className="text-cyan-400 ml-1">{activeFaq === i ? "−" : "+"}</span>
                  </button>
                  {activeFaq === i && (
                    <p className="mt-2 text-slate-400 text-[11px] leading-relaxed pt-1 border-t border-slate-800">
                      {f.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 TECHNOVA Inc. All rights reserved. Interactive E-Commerce Portfolio Demonstration.
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <button
              onClick={() => {
                if (onBackToAgency) {
                  onBackToAgency();
                } else {
                  window.location.href = window.location.origin + window.location.pathname;
                }
              }}
              className="text-cyan-400 hover:text-cyan-300 font-bold underline transition-colors cursor-pointer"
            >
              ← Back to ANX Site
            </button>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Shipping & Returns</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
