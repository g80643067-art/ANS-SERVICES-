import React, { useState, useEffect } from "react";
import { ExternalLink, Sparkles } from "lucide-react";
import { electronicDevicesDemoItem, bakeryDemoItem, ecommerceDemoItem, clothesDemoItem, beautyDemoItem } from "./ANX3DShowcaseSection";

// Central Registry
export const DEMO_REGISTRY = [
  {
    id: "ecommerce-demo",
    category: "ecommerce",
    keywords: ["ecommerce", "e-commerce", "online store", "shopping", "product store", "online shopping", "shop", "marketplace", "products"],
    projectName: "ANX Mart E-Commerce",
    memberId: 1,
    memberName: "Aditya",
    description: "Modern online shopping interface, product catalog & cart experience built for scalable e-commerce.",
    img: ecommerceDemoItem.img,
    demoUrl: ecommerceDemoItem.demoUrl,
    demoAction: "SHOW_BUSINESS_DEMO"
  },
  {
    id: "electronics-demo",
    category: "electronics",
    keywords: ["electronics", "electronic shop", "mobile", "laptop", "computer", "gadgets", "TV", "headphones", "electronic store", "accessories"],
    projectName: "TechNova Electronics & Gadget Hub",
    memberId: 2,
    memberName: "Nikhil",
    description: "Smart tech gadgets store featuring modern UI for electronics, audio and wearables.",
    img: electronicDevicesDemoItem.img,
    demoUrl: electronicDevicesDemoItem.demoUrl,
    demoAction: "SHOW_ELECTRONICS_DEMO"
  },
  {
    id: "bakery-demo",
    category: "restaurant",
    keywords: ["restaurant", "cafe", "food", "pizza", "burger", "bakery", "hotel food", "menu", "food ordering"],
    projectName: "SweetCrust Artisan Bakery App",
    memberId: 2,
    memberName: "Nikhil",
    description: "Artisan Breads, French Pastries, Gourmet Cakes & Fresh Baked Goods e-commerce.",
    img: bakeryDemoItem.img,
    demoUrl: bakeryDemoItem.demoUrl,
    demoAction: "SHOW_BAKERY_DEMO"
  },
  {
    id: "fashion-demo",
    category: "clothes",
    keywords: ["clothes", "clothing", "fashion", "dress", "dresses", "kurti", "saree", "shirts", "jeans", "fashion store", "boutique"],
    projectName: "Nova Wear Luxury Fashion",
    memberId: 1,
    memberName: "Aditya",
    description: "Modern luxury lookbook and designer storefront.",
    img: clothesDemoItem.img,
    demoUrl: clothesDemoItem.demoUrl,
    demoAction: "SHOW_TUITION_DEMO"
  },
  {
    id: "beauty-demo",
    category: "beauty",
    keywords: ["beauty", "makeup", "makeup artist", "bridal", "bridal makeup", "salon", "parlour", "beauty parlour", "wedding makeup", "bride", "shadi", "shaadi", "wedding", "marriage", "wedding invitation", "wedding website", "baraat", "groom"],
    projectName: "Haute Beauté Salon & Spa",
    memberId: 2,
    memberName: "Nikhil",
    description: "Bespoke hair styling, radiant aesthetic skincare, and luxury wellness.",
    img: beautyDemoItem.img,
    demoUrl: beautyDemoItem.demoUrl,
    demoAction: "SHOW_SALON_DEMO"
  }
];

export const DemoSitesSection: React.FC<{
  onLaunchDemoAction: (action: string) => void;
}> = ({ onLaunchDemoAction }) => {
  const [highlightedMemberId, setHighlightedMemberId] = useState<number | null>(null);

  useEffect(() => {
    const handleFilterEvent = (e: any) => {
      const { memberId } = e.detail;
      setHighlightedMemberId(memberId);
      // scroll to this section
      document.getElementById("demo-sites-list")?.scrollIntoView({ behavior: "smooth" });
    };
    window.addEventListener("FILTER_DEMO_SITES", handleFilterEvent);
    return () => window.removeEventListener("FILTER_DEMO_SITES", handleFilterEvent);
  }, []);

  const displayedDemos = highlightedMemberId 
    ? DEMO_REGISTRY.filter(d => d.memberId === highlightedMemberId)
    : DEMO_REGISTRY;

  return (
    <section id="demo-sites-list" className="py-16 px-4 sm:px-6 lg:px-8 relative bg-[#0C0C0E] border-t border-[#7C3AED]/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase font-sans">
            {highlightedMemberId ? `Demos by ${displayedDemos[0]?.memberName || "Member"}` : "Demo Sites"}
          </h2>
          <div className="w-12 h-1 bg-[#7C3AED] mx-auto mt-3 rounded-full shadow-[0_0_10px_rgba(124,58,237,0.6)]" />
          {highlightedMemberId && (
            <button 
              onClick={() => setHighlightedMemberId(null)}
              className="mt-4 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider"
            >
              Show All Demos
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedDemos.map((demo) => (
            <div 
              key={demo.id} 
              data-demo-category={demo.category} 
              className="bg-[#151515] rounded-3xl border border-[#7C3AED]/20 overflow-hidden hover:border-[#7C3AED]/60 transition-colors group flex flex-col"
            >
              <div className="h-48 w-full overflow-hidden relative shrink-0">
                <img src={demo.img} alt={demo.projectName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-bold text-[#A78BFA] tracking-wider uppercase">{demo.memberName}'s Project</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{demo.projectName}</h3>
                <p className="text-sm text-slate-400 mb-6 line-clamp-3 flex-1">{demo.description}</p>
                <div className="flex items-center gap-3 mt-auto">
                  <button 
                    onClick={() => onLaunchDemoAction(demo.demoAction)}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2.5 px-4 rounded-xl font-semibold text-sm transition-colors"
                  >
                    <Sparkles className="w-4 h-4" /> View Demo
                  </button>
                  {demo.demoUrl && demo.demoUrl !== "#" && !demo.demoUrl.includes("[PASTE") && (
                    <a 
                      href={demo.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2.5 bg-[#1F1F23] border border-[#33333A] rounded-xl text-slate-300 hover:text-white hover:border-[#7C3AED] transition-colors"
                      title="Open external link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
