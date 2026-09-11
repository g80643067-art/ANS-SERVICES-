import React from "react";
import { CATEGORIES_DATA } from "./bakeryData";
import { ProductCategory } from "./types";
import { ArrowUpRight } from "lucide-react";

interface SweetCrustCategoriesProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
}

export function SweetCrustCategories({
  selectedCategory,
  onSelectCategory,
}: SweetCrustCategoriesProps) {
  return (
    <section id="categories" className="py-16 bg-[#FFFDF9] border-b border-[#F0E6D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#9C4A1A] block mb-2">
            EXPLORE OUR ARTISANAL SELECTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-[#3C2415]">
            Fresh Categories
          </h2>
          <div className="w-16 h-1 bg-[#C67D34] rounded-full mx-auto mt-3 mb-4" />
          <p className="text-sm sm:text-base text-[#6B5341]">
            From morning sourdough and flaky croissants to exquisite custom celebration cakes. Click any category to explore our offerings.
          </p>
        </div>

        {/* Categories Grid - 8 Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES_DATA.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative text-left rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer focus:outline-hidden ${
                  isSelected
                    ? "border-[#9C4A1A] ring-2 ring-[#9C4A1A]/30 shadow-lg -translate-y-1"
                    : "border-[#EADBCE] bg-[#FAF3EC]/60 hover:bg-white hover:border-[#C67D34] hover:shadow-md hover:-translate-y-1"
                }`}
              >
                {/* Image Container */}
                <div className="relative h-36 sm:h-44 w-full overflow-hidden bg-[#2D1B10]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#20130B]/85 via-[#20130B]/30 to-transparent" />

                  {/* Corner Item Count Badge */}
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[#FFFDF9] text-[10px] font-bold border border-white/20">
                    {cat.count} items
                  </span>

                  {/* Arrow Icon */}
                  <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white/90 text-[#3C2415] flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-md">
                    <ArrowUpRight className="w-4 h-4 text-[#9C4A1A]" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 bg-white/90">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#3C2415] group-hover:text-[#9C4A1A] transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[#7A6453] line-clamp-1 mt-1">
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
