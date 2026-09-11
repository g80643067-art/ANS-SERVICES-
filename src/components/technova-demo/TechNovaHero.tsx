import React from "react";
import { ArrowRight, Sparkles, Shield, Cpu, Zap, Wifi } from "lucide-react";
import electronicDevicesPosterImg from "../../assets/images/electronic_devices_demo_poster_1789153164935.jpg";

interface TechNovaHeroProps {
  onShopNow: () => void;
  onExploreDeals: () => void;
}

export function TechNovaHero({ onShopNow, onExploreDeals }: TechNovaHeroProps) {
  return (
    <section id="hero" className="relative py-12 md:py-20 bg-[#07090E] overflow-hidden border-b border-cyan-500/20">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/3 translate-y-1/3 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(6,182,212,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Next-Gen Consumer Tech 2026 Collection</span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.08]">
              TECHNOLOGY{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                MADE FOR YOU
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-xl font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Discover the latest devices, gadgets and smart technology. Flagship smartphones, ultra-thin creator laptops, immersive 4K OLED displays, and high-performance audio engineered for the modern world.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onShopNow}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreDeals}
                className="px-7 py-4 rounded-xl bg-[#0F1424] hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 hover:text-cyan-300 font-bold text-sm tracking-wider uppercase transition-all cursor-pointer"
              >
                VIEW TODAY'S DEALS
              </button>
            </div>

            {/* Tech highlights bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-left">
                  <div className="text-white text-xs font-bold">3nm Processors</div>
                  <div className="text-[11px] text-slate-400">Peak AI Compute</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-left">
                  <div className="text-white text-xs font-bold">Ultra Fast Qi2</div>
                  <div className="text-[11px] text-slate-400">140W GaN Charging</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-left">
                  <div className="text-white text-xs font-bold">2-Yr Warranty</div>
                  <div className="text-[11px] text-slate-400">Full Hardware Cover</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur-xl opacity-30 animate-pulse" />

              {/* Main Card Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-[#0B0F19] shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={electronicDevicesPosterImg}
                    alt="TechNova Premium Electronics Suite"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />

                  {/* High-tech overlay shading */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-black/20" />

                  {/* Floating Specs Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-bold">
                    <Wifi className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Wi-Fi 7 & 5G UltraSync</span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#090D17]/85 backdrop-blur-xl border border-cyan-500/30 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase">Featured Flagship</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold">Ready to Ship</span>
                    </div>
                    <h3 className="text-lg font-black text-white">Nova ecosystem devices connected in seamless harmony</h3>
                    <p className="text-xs text-slate-400 mt-1">Laptops, Smartphones, Smartwatches, 4K TVs and Spatial Audio</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
