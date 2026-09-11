import React from "react";
import { Sparkles, ArrowUp, Instagram, Facebook, Youtube, Phone, Mail, MapPin, Heart } from "lucide-react";

interface BeautyFooterProps {
  onScrollToTop: () => void;
  onScrollToSection: (sectionId: string) => void;
  onBackToAgency: () => void;
}

export function BeautyFooter({
  onScrollToTop,
  onScrollToSection,
  onBackToAgency,
}: BeautyFooterProps) {
  return (
    <footer className="bg-[#1c130f] text-[#ded0c5] border-t border-[#3b2b22] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#36261e]">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#3d2a20] flex items-center justify-center text-[#f4d4ba] shadow-sm">
                <Sparkles className="w-5 h-5 text-[#f4d4ba]" />
              </div>
              <div>
                <span className="font-serif tracking-[0.2em] text-xl font-bold text-[#fcf9f5] uppercase block">
                  BEAUTY DEMO
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-[#ab8a74] uppercase font-medium">
                  HAUTE COUTURE BRIDAL STUDIO
                </span>
              </div>
            </div>

            <p className="text-xs text-[#b8a292] leading-relaxed max-w-sm">
              Crafting timeless elegance, radiant high-definition makeup, and bespoke bridal hair
              styling for modern brides across the world.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#2c1d16] hover:bg-[#8f5e3b] text-[#e8d5c4] hover:text-white flex items-center justify-center transition-colors border border-[#4a3427]"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#2c1d16] hover:bg-[#8f5e3b] text-[#e8d5c4] hover:text-white flex items-center justify-center transition-colors border border-[#4a3427]"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#2c1d16] hover:bg-[#8f5e3b] text-[#e8d5c4] hover:text-white flex items-center justify-center transition-colors border border-[#4a3427]"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs font-bold tracking-widest uppercase text-[#f4d4ba] block">
              Services
            </span>
            <ul className="space-y-2 text-xs text-[#bfaea0]">
              <li>
                <button
                  onClick={() => onScrollToSection("services")}
                  className="hover:text-white transition-colors"
                >
                  Bridal Makeup
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("services")}
                  className="hover:text-white transition-colors"
                >
                  Engagement & Sagan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("services")}
                  className="hover:text-white transition-colors"
                >
                  Reception Radiance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("services")}
                  className="hover:text-white transition-colors"
                >
                  Hair & Floral Styling
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("services")}
                  className="hover:text-white transition-colors"
                >
                  HD & Airbrush System
                </button>
              </li>
            </ul>
          </div>

          {/* Packages */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs font-bold tracking-widest uppercase text-[#f4d4ba] block">
              Experiences
            </span>
            <ul className="space-y-2 text-xs text-[#bfaea0]">
              <li>
                <button
                  onClick={() => onScrollToSection("packages")}
                  className="hover:text-white transition-colors"
                >
                  Classic Bridal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("packages")}
                  className="hover:text-white transition-colors"
                >
                  Signature Premium
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("packages")}
                  className="hover:text-white transition-colors"
                >
                  Royal Couture Empress
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("gallery")}
                  className="hover:text-white transition-colors"
                >
                  Bridal Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("testimonials")}
                  className="hover:text-white transition-colors"
                >
                  Real Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Studio Contact Info */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold tracking-widest uppercase text-[#f4d4ba] block">
              Studio & Concierge
            </span>
            <div className="space-y-2 text-xs text-[#bfaea0]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8f5e3b] shrink-0 mt-0.5" />
                <span>45 Haute Couture Boulevard, Luxury Suite 300, Bridal District</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#8f5e3b] shrink-0" />
                <span>+1 (555) 382-9000 / +91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#8f5e3b] shrink-0" />
                <span>concierge@beautydemo.luxury</span>
              </div>
              <p className="text-[11px] text-[#8f796c] pt-1">
                Studio Hours: Tue–Sun 9:00 AM – 8:00 PM (Bridal Destination Travel 24/7)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8f796c]">
          <p>© 2026 BEAUTY DEMO Bridal Studio. Designed by ANX Studio.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (onBackToAgency) {
                  onBackToAgency();
                } else {
                  window.location.href = window.location.origin + window.location.pathname;
                }
              }}
              className="text-[#f4d4ba] hover:underline font-semibold cursor-pointer"
            >
              ← Back to ANX Site
            </button>

            <button
              onClick={onScrollToTop}
              className="inline-flex items-center gap-1 text-[#bfaea0] hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
