import React from "react";
import {
  Phone,
  MessageCircle,
  Instagram,
  Sparkles,
  ArrowUp,
  Heart,
} from "lucide-react";

interface FooterProps {
  onOpenDemo: () => void;
  onScrollToTop: () => void;
}

export function Footer({ onOpenDemo, onScrollToTop }: FooterProps) {
  return (
    <footer className="relative border-t border-purple-500/20 bg-[#060708]/85 backdrop-blur-2xl py-14 px-4 sm:px-6 lg:px-8 text-slate-400 pointer-events-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 p-[1px]">
                <div className="w-full h-full bg-[#08090e] rounded-[11px] flex items-center justify-center">
                  <span className="font-black text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">
                    ANX
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-white text-base">ANX</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400">
                  Website Development Services
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              Delivering premium, high-impact web design & custom WebGL engineering tailored to your budget and exact business needs.
            </p>

            {/* Direct contact chips */}
            <div className="flex flex-wrap gap-2">
              <a
                href="tel:+917348382816"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-white hover:text-purple-300 hover:border-purple-500/40 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                <span>+91 7348382816</span>
              </a>
              <a
                href="tel:+91219694862"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-white hover:text-blue-300 hover:border-blue-500/40 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>+91 219694862</span>
              </a>
            </div>
          </div>

          {/* Services Column (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#services" className="hover:text-purple-300 transition-colors">
                  Business Websites
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-purple-300 transition-colors">
                  3D & Premium Websites
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-purple-300 transition-colors">
                  Custom Websites
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-purple-300 transition-colors">
                  Budget Friendly Solutions
                </a>
              </li>
              <li>
                <button onClick={onOpenDemo} className="hover:text-purple-300 transition-colors text-left">
                  Free Interactive Demo
                </button>
              </li>
            </ul>
          </div>

          {/* Social & Contact Actions (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Connect Directly
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Connect with our team for quick questions or immediate quotes.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="tel:+917348382816"
                className="p-3 rounded-xl bg-slate-900/80 hover:bg-purple-900/60 border border-purple-500/20 text-purple-300 hover:text-white transition-all"
                title="Call Now"
              >
                <Phone className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/917348382816"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-900/80 hover:bg-emerald-900/60 border border-emerald-500/20 text-emerald-300 hover:text-white transition-all"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-900/80 hover:bg-pink-900/60 border border-pink-500/20 text-pink-300 hover:text-white transition-all"
                title="Instagram: [MY INSTAGRAM HANDLE]"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-5">
              <span className="text-xs font-mono text-slate-400 block">
                Instagram: <span className="text-pink-400 font-semibold">[MY INSTAGRAM HANDLE]</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} ANX Website Development Services. All rights reserved.
          </div>

          <button
            onClick={onScrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-purple-300 transition-colors p-2 rounded-lg bg-slate-900 border border-slate-800"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
