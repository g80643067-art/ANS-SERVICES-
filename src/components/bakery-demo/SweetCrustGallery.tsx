import React, { useState } from "react";
import { GALLERY_ITEMS, GalleryItem } from "./bakeryData";
import { Camera, X, Eye, Sparkles } from "lucide-react";

export function SweetCrustGallery() {
  const [filter, setFilter] = useState<"all" | "cakes" | "pastries" | "breads" | "interior">("all");
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const filterTabs: { label: string; value: "all" | "cakes" | "pastries" | "breads" | "interior" }[] = [
    { label: "All Moments", value: "all" },
    { label: "Cakes", value: "cakes" },
    { label: "Pastries", value: "pastries" },
    { label: "Breads", value: "breads" },
    { label: "Bakehouse Interior", value: "interior" },
  ];

  const filteredItems =
    filter === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.category === filter);

  return (
    <section id="gallery" className="py-20 bg-[#FFFDF9] border-b border-[#F0E6D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F4E6D6] text-[#9C4A1A] text-xs font-bold uppercase tracking-wider mb-2">
            <Camera className="w-3.5 h-3.5 text-[#C67D34]" />
            <span>VISUAL BAKEHOUSE MOMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-[#3C2415]">
            Artisan Gallery
          </h2>
          <div className="w-16 h-1 bg-[#C67D34] rounded-full mx-auto mt-3 mb-4" />
          <p className="text-sm sm:text-base text-[#6B5341]">
            A visual glimpse into our sunlit oven mornings, golden viennoiserie, bespoke wedding cakes, and cozy bakery cafe.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === tab.value
                  ? "bg-[#3C2415] text-white shadow-sm"
                  : "bg-[#FAF3EC] text-[#5A4333] hover:bg-[#F0E6D8] border border-[#EADBCE]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              className="group relative rounded-2xl overflow-hidden aspect-4/5 bg-[#2D1B10] cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 border border-[#EADBCE] hover:border-[#C67D34] hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Hover zoom icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#3C2415] opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                <Eye className="w-4 h-4 text-[#9C4A1A]" />
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E6A15C] block mb-0.5">
                  {item.category}
                </span>
                <h4 className="font-serif font-bold text-white text-base leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-[#D8C7B5] line-clamp-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative max-w-3xl w-full bg-[#1A1009] rounded-3xl overflow-hidden border border-[#52331E] shadow-2xl">
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black text-white transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-16/10 sm:aspect-16/9 w-full overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeLightbox.image}
                alt={activeLightbox.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 text-white space-y-1 bg-[#24150B]">
              <span className="text-xs uppercase tracking-wider text-[#E6A15C] font-bold">
                {activeLightbox.category}
              </span>
              <h3 className="font-serif font-bold text-2xl">
                {activeLightbox.title}
              </h3>
              <p className="text-sm text-[#D8C7B5] leading-relaxed">
                {activeLightbox.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
