import React from "react";
import {
  Phone,
  MessageCircle,
  Instagram,
  MapPin,
  Clock,
  Navigation,
  Sparkles,
  ExternalLink,
  Flame,
  CheckCircle,
} from "lucide-react";

export function FoodContactSection() {
  return (
    <section id="food-contact" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wider uppercase mb-3">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Find Us & Connect</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
          Visit Our Stall or{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
            Order Direct
          </span>
        </h2>
        <p className="text-zinc-300 text-sm sm:text-base">
          Got a midnight craving or planning a party feast? Call our kitchen directly or visit our open street counter.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Direct Contact & Hours (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* Phone Numbers Card */}
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Call Kitchen Direct</h3>
                <p className="text-xs text-zinc-400">Instant order confirmation & inquiries</p>
              </div>
            </div>

            <div className="space-y-2.5">
              <a
                href="tel:+91219694862"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800/80 text-white font-bold text-sm transition-all group"
              >
                <span>+91 219694862</span>
                <span className="text-xs font-semibold text-amber-400 group-hover:underline flex items-center gap-1">
                  Call Line 1 →
                </span>
              </a>

              <a
                href="tel:+917348382816"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800/80 text-white font-bold text-sm transition-all group"
              >
                <span>+91 7348382816</span>
                <span className="text-xs font-semibold text-amber-400 group-hover:underline flex items-center gap-1">
                  Call Line 2 →
                </span>
              </a>
            </div>
          </div>

          {/* WhatsApp & Socials Card */}
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Instant WhatsApp & Social</h3>
                <p className="text-xs text-zinc-400">Chat with kitchen master & food updates</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="https://wa.me/917348382816?text=Hi%20Desi%20Crave,%20I%20want%20to%20order%20food!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-bold text-xs transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Order</span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-pink-950/60 hover:bg-pink-900/80 border border-pink-500/40 text-pink-300 font-bold text-xs transition-all"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>@desicrave.street</span>
              </a>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 text-amber-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Opening Hours</h4>
                <p className="text-xs text-zinc-400">Monday – Sunday: 11:00 AM – 1:00 AM</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30">
              OPEN NOW
            </span>
          </div>
        </div>

        {/* Right Column: Google Maps Style Interactive Location (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="h-full rounded-3xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Ambient Map background simulation */}
            <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-zinc-800 bg-[#12141a] mb-6 flex items-center justify-center">
              {/* Map grid lines simulation */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(#f59e0b 1px, transparent 1px), linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)",
                  backgroundSize: "20px 20px, 40px 40px, 40px 40px",
                }}
              />

              {/* Road lines simulation */}
              <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
                <path
                  d="M0,80 Q200,120 400,60 T800,180"
                  stroke="#fbbf24"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  d="M100,0 Q180,180 320,300"
                  stroke="#60a5fa"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M300,0 L320,350"
                  stroke="#a855f7"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>

              {/* Center Map Pin with Pulse */}
              <div className="relative z-10 flex flex-col items-center animate-bounce">
                <div className="w-12 h-12 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.8)]">
                  <Flame className="w-6 h-6 fill-zinc-950 text-zinc-950" />
                </div>
                <div className="mt-2 px-3 py-1 rounded-lg bg-zinc-950/90 text-white border border-amber-500/50 text-xs font-black shadow-lg">
                  DESI CRAVE STREET FOOD
                </div>
              </div>

              {/* Google Maps UI overlay badge */}
              <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-zinc-950/90 border border-zinc-800 text-[11px] font-bold text-zinc-300 flex items-center gap-1.5 shadow">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Google Maps Live Location</span>
              </div>

              {/* Get Directions overlay trigger */}
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-extrabold flex items-center gap-1.5 shadow-lg transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>
            </div>

            {/* Address Details & Amenities */}
            <div>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    Shop 14, Food Street Walk, Near Central Metro Station
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Connaught Place / Main Market Hub, New Delhi - 110001
                  </p>
                </div>
              </div>

              {/* Amenities tags */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-4 border-t border-zinc-800 text-xs text-zinc-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Outdoor Seating</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Late Night Bites</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>UPI / Cards Accepted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
