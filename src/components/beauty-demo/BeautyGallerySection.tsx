import React, { useState } from "react";
import { Sparkles, Maximize2, X, Eye } from "lucide-react";
import { GALLERY_ITEMS, GalleryItem } from "@/data/beautyDemoData";

export function BeautyGallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: "all", label: "All Masterpieces" },
    { id: "bridal", label: "Royal Bridal" },
    { id: "engagement", label: "Engagement Glam" },
    { id: "reception", label: "Reception Radiance" },
    { id: "hair", label: "Hair & Draping" },
    { id: "airbrush", label: "HD Airbrush" },
  ];

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-[#fdfcf9] border-t border-[#f0e6dd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4e7dc] text-[#855539] text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#b0774c]" />
            <span>REAL BRIDAL TRANSFORMATIONS</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#231815] font-bold">
            Bridal Couture Gallery
          </h2>

          <p className="text-[#69554a] text-sm sm:text-base leading-relaxed">
            Explore our portfolio of radiant wedding makeovers, bespoke floral hairstyles,
            and flawless saree & lehenga drapery.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#8f5e3b] text-white shadow-md"
                  : "bg-[#f4ebe1] text-[#695448] hover:bg-[#ebd8c8]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item: GalleryItem) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#2d1e17] cursor-pointer shadow-[0_4px_20px_rgba(40,25,15,0.06)] hover:shadow-[0_15px_35px_rgba(143,94,59,0.2)] transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Top Tag */}
              <div className="absolute top-3 left-3">
                <span className="inline-block bg-black/40 backdrop-blur-md text-[#f4d4ba] text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border border-white/10">
                  {item.categoryLabel}
                </span>
              </div>

              {/* Center Zoom Icon on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-white transform group-hover:-translate-y-0.5 transition-transform">
                <h3 className="font-serif text-base font-bold drop-shadow-md text-[#ffffff]">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#f4d4ba]/90 line-clamp-2 mt-1 leading-snug">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#1e1410] rounded-2xl overflow-hidden border border-[#523d30] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[4/3] sm:aspect-[16/10] bg-black">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-[#251914] text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#f4d4ba] uppercase tracking-wider block">
                  {selectedItem.categoryLabel}
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-0.5">
                  {selectedItem.title}
                </h3>
                <p className="text-xs text-[#d6c4b6] mt-1">{selectedItem.caption}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
