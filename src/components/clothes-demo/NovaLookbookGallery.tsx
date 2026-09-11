import React, { useState } from "react";
import { Sparkles, X, Eye, Maximize2 } from "lucide-react";
import { LOOKBOOK_GALLERY } from "./clothesData";

export function NovaLookbookGallery() {
  const [selectedItem, setSelectedItem] = useState<{
    title: string;
    subtitle: string;
    img: string;
    category: string;
  } | null>(null);

  return (
    <section id="nova-lookbook" className="py-20 bg-[#08080a] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Haute Édition
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wide font-light">
            THE RUNWAY LOOKBOOK
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base font-light">
            Captured during our seasonal presentations in Milan, Paris, Tokyo, and New Delhi.
          </p>
        </div>

        {/* Lookbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOOKBOOK_GALLERY.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-zinc-900 border border-white/10 hover:border-amber-400/50 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl"
            >
              {/* Image */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity" />

              {/* Category Pill */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/75 border border-white/20 text-white text-[10px] uppercase tracking-widest font-semibold backdrop-blur-md">
                  {item.category}
                </span>
              </div>

              {/* Expand Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/15 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                <Maximize2 className="w-4 h-4 text-amber-300" />
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                <span className="text-[10px] text-amber-400 uppercase tracking-widest font-semibold">
                  {item.subtitle}
                </span>
                <h3 className="text-xl font-serif text-white tracking-wide mt-1 group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-zinc-950 rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative flex-1 overflow-hidden bg-black flex items-center justify-center max-h-[72vh]">
              <img
                src={selectedItem.img}
                alt={selectedItem.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="p-6 bg-zinc-950 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-400 font-semibold tracking-wider uppercase">
                  {selectedItem.category} • {selectedItem.subtitle}
                </span>
                <h3 className="text-xl font-serif text-white">{selectedItem.title}</h3>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
