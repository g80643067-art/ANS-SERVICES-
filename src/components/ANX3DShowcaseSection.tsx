import React from "react";
import { CoverFlowCarousel, CarouselItem } from "@/components/ui/3-d-coverflow-carousel";
import { Sparkles, ArrowRight, Zap } from "lucide-react";

import streetFoodPosterImg from "../assets/images/street_food_demo_1789148647372.jpg";
import beautySalonImg from "../assets/images/beauty_salon_demo_poster_1789150145098.jpg";
import electronicDevicesPosterImg from "../assets/images/electronic_devices_demo_poster_1789153164935.jpg";
import bakeryPosterImg from "../assets/images/bakery_demo_poster_1789154336314.jpg";

// Destination URL for the Beauty Demo card (opens in a new tab when clicked)
// [PASTE BEAUTY DEMO WEBSITE URL HERE]
export const BEAUTY_DEMO_URL = "https://beauty-salon-demo.web.app";

// Destination URL for the Clothes Demo card (opens in a new tab when clicked)
// [PASTE CLOTHES DEMO URL HERE]
export const CLOTHES_DEMO_URL = "[PASTE CLOTHES DEMO URL HERE]";

// Destination URL for the Electronic Devices Demo card (opens in a new tab when clicked)
// [PASTE ELECTRONIC DEVICES DEMO URL HERE]
export const ELECTRONIC_DEVICES_DEMO_URL = "[PASTE ELECTRONIC DEVICES DEMO URL HERE]";

// Destination URL for the Bakery Demo card (opens in a new tab when clicked)
// [PASTE BAKERY DEMO URL HERE]
export const BAKERY_DEMO_URL = "[PASTE BAKERY DEMO URL HERE]";

interface ANX3DShowcaseSectionProps {
  onLaunchFoodDemo: () => void;
  onLaunchBeautyDemo?: () => void;
  onLaunchClothesDemo?: () => void;
  onLaunchElectronicsDemo?: () => void;
  onLaunchBakeryDemo?: () => void;
  onOpenDemoModal: (serviceName?: string) => void;
}

// 1. Premium Clothes / Fashion Brand Demo Item (Clickable - opens destination URL in new tab)
export const clothesDemoItem: CarouselItem = {
  isClothesDemo: true,
  tag: "#LuxuryFashion",
  titleLine1: "ATELIER & COUTURE",
  titleLine2: "COLLECTION",
  desc: "Modern luxury lookbook, high-end apparel, urban streetwear & designer storefront",
  img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
  demoUrl: CLOTHES_DEMO_URL,
};

// 2. Premium Beauty / Salon Demo Item (Clickable - opens destination URL in new tab)
export const beautyDemoItem: CarouselItem = {
  isBeautyDemo: true,
  tag: "#LuxuryBeauty",
  titleLine1: "HAUTE BEAUTÉ",
  titleLine2: "SALON & SPA",
  desc: "Bespoke hair styling, radiant aesthetic skincare, and luxury wellness",
  img: beautySalonImg,
  demoUrl: BEAUTY_DEMO_URL,
};

// 3. Premium Electronic Devices Demo Item (Clickable - opens destination URL in new tab)
export const electronicDevicesDemoItem: CarouselItem = {
  isElectronicsDemo: true,
  tag: "#SmartTech",
  titleLine1: "SMART TECH & GADGETS",
  titleLine2: "ELECTRONIC DEVICES",
  desc: "Smartphones, Laptops, 4K Smart TVs, Wearables & Audio",
  img: electronicDevicesPosterImg,
  demoUrl: ELECTRONIC_DEVICES_DEMO_URL,
};

// 4. Premium Bakery Demo Item (Clickable - opens destination URL in new tab)
export const bakeryDemoItem: CarouselItem = {
  isBakeryDemo: true,
  tag: "#ArtisanBakery",
  titleLine1: "ARTISAN PATISSERIE & BAKEHOUSE",
  titleLine2: "BAKERY DEMO",
  desc: "Artisan Breads, French Pastries, Gourmet Cakes & Fresh Baked Goods",
  img: bakeryPosterImg,
  demoUrl: BAKERY_DEMO_URL,
};

// 5. Restaurant & Street Food Demo Item (Clickable - launches interactive food demo)
export const streetFoodDemoItem: CarouselItem = {
  img: streetFoodPosterImg,
  isLiveDemo: true,
  titleLine1: "RESTAURANT & STREET FOOD",
  demoUrl: "#",
  ctaText: "Launch Food Demo",
  ctaUrl: "#",
};

// ONLY the demo cards explicitly created - no unwanted or placeholder cards
const liveDemoItems: CarouselItem[] = [
  clothesDemoItem,
  beautyDemoItem,
  electronicDevicesDemoItem,
  bakeryDemoItem,
  streetFoodDemoItem,
];

export function ANX3DShowcaseSection({
  onLaunchFoodDemo,
  onLaunchBeautyDemo,
  onLaunchClothesDemo,
  onLaunchElectronicsDemo,
  onLaunchBakeryDemo,
  onOpenDemoModal,
}: ANX3DShowcaseSectionProps) {
  return (
    <section id="slider-showcase" className="relative py-16 bg-[#080709] border-y border-purple-500/20 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-r from-purple-600/10 via-amber-600/10 to-blue-600/10 blur-[150px] pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading ABOVE the slider */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300 text-xs font-bold tracking-wider uppercase mb-4 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>Interactive Demo Showcase</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            CHECK DEMO SITE{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300">
              FOR YOUR BUSINESS
            </span>
          </h2>
        </div>

        {/* 3D Coverflow Carousel Component - Showing ONLY the created demo cards */}
        <div className="relative rounded-3xl overflow-hidden border border-zinc-800/80 bg-black/40 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          <CoverFlowCarousel
            items={liveDemoItems}
            sectionLabel="FEATURED LIVE DEMOS"
            autoplay={true}
            autoplayDelay={4500}
            onClothesDemoClick={(item) => {
              const rawUrl = item.demoUrl || CLOTHES_DEMO_URL;
              // If user pasted custom external URL into CLOTHES_DEMO_URL, open that URL in a new tab.
              // If it's the placeholder, open the built-in Clothes Store Demo in a new tab!
              const targetUrl =
                rawUrl && rawUrl !== "[PASTE CLOTHES DEMO URL HERE]" && rawUrl !== "#"
                  ? rawUrl
                  : `${window.location.origin}${window.location.pathname}?demo=clothes`;
              try {
                const newWin = window.open(targetUrl, "_blank", "noopener,noreferrer");
                if (!newWin && onLaunchClothesDemo) {
                  onLaunchClothesDemo();
                }
              } catch {
                if (onLaunchClothesDemo) onLaunchClothesDemo();
              }
            }}
            onBeautyDemoClick={(item) => {
              if (onLaunchBeautyDemo) {
                onLaunchBeautyDemo();
              } else {
                const targetUrl = item.demoUrl || BEAUTY_DEMO_URL;
                if (targetUrl && targetUrl !== "#") {
                  window.open(targetUrl, "_blank", "noopener,noreferrer");
                }
              }
            }}
            onElectronicsDemoClick={(item) => {
              const rawUrl = item.demoUrl || ELECTRONIC_DEVICES_DEMO_URL;
              const targetUrl =
                rawUrl && rawUrl !== "[PASTE ELECTRONIC DEVICES DEMO URL HERE]" && rawUrl !== "#"
                  ? (rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`)
                  : `${window.location.origin}${window.location.pathname}?demo=electronics`;
              try {
                const newWin = window.open(targetUrl, "_blank", "noopener,noreferrer");
                if (!newWin && onLaunchElectronicsDemo) {
                  onLaunchElectronicsDemo();
                }
              } catch {
                if (onLaunchElectronicsDemo) onLaunchElectronicsDemo();
              }
            }}
            onBakeryDemoClick={(item) => {
              const rawUrl = item.demoUrl || BAKERY_DEMO_URL;
              const targetUrl =
                rawUrl && rawUrl !== "[PASTE BAKERY DEMO URL HERE]" && rawUrl !== "#"
                  ? (rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`)
                  : `${window.location.origin}${window.location.pathname}?demo=bakery`;
              try {
                const newWin = window.open(targetUrl, "_blank", "noopener,noreferrer");
                if (!newWin && onLaunchBakeryDemo) {
                  onLaunchBakeryDemo();
                }
              } catch {
                if (onLaunchBakeryDemo) onLaunchBakeryDemo();
              }
            }}
            onLiveDemoClick={() => {
              if (onLaunchFoodDemo) {
                onLaunchFoodDemo();
              }
            }}
          />
        </div>

        {/* Centered Subtitle BELOW the slider */}
        <div className="mt-7 sm:mt-8 text-center max-w-2xl mx-auto px-4">
          <p className="text-slate-300 text-xs sm:text-sm md:text-base font-normal leading-relaxed">
            If the demo doesn't match your business profile,{" "}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-purple-400 hover:text-purple-300 font-semibold underline underline-offset-4 decoration-purple-500/60 hover:decoration-purple-300 transition-colors cursor-pointer"
            >
              contact us here
            </a>{" "}
            to get a custom demo site made for your business.
          </p>
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-950/80 border border-purple-500/20 max-w-4xl mx-auto backdrop-blur-xl">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Want a custom 3D slider for your website?</h4>
              <p className="text-xs text-slate-400">Included in our 3D & Custom website development packages under your budget.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onOpenDemoModal("Custom Website & 3D Interactive Design")}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request Free Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
