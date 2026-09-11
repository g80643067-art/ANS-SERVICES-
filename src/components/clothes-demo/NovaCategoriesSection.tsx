import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { ProductCategory } from "./types";

interface NovaCategoriesSectionProps {
  onSelectCategory: (category: ProductCategory) => void;
}

interface CategoryCard {
  id: ProductCategory;
  title: string;
  subtitle: string;
  itemCount: string;
  image: string;
  badge?: string;
}

export function NovaCategoriesSection({ onSelectCategory }: NovaCategoriesSectionProps) {
  const categories: CategoryCard[] = [
    {
      id: "Women",
      title: "Women's Couture",
      subtitle: "Silk Gowns, Wool Trenches & Cashmere Knits",
      itemCount: "48 Pieces",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
      badge: "Autumn Runway",
    },
    {
      id: "Men",
      title: "Men's Sartorial",
      subtitle: "Bespoke Wool Suits & Italian Linen Shirts",
      itemCount: "36 Pieces",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
      badge: "Savile Tailoring",
    },
    {
      id: "Streetwear",
      title: "Urban Streetwear",
      subtitle: "Heavyweight 500GSM Hoodies & Tactical Cargos",
      itemCount: "42 Pieces",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop",
      badge: "Trending Subculture",
    },
    {
      id: "Ethnic Wear",
      title: "Regal Ethnic Wear",
      subtitle: "Handwoven Zari Sarees & Royal Silk Sherwanis",
      itemCount: "28 Pieces",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
      badge: "Artisanal Heirloom",
    },
    {
      id: "New Arrivals",
      title: "New Arrivals Capsule",
      subtitle: "Latest Runway Drops & Limited Edition Releases",
      itemCount: "16 Pieces",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
      badge: "Limited Edition",
    },
  ];

  return (
    <section id="nova-categories" className="py-20 bg-[#09090b] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold flex items-center justify-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Lines
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wide font-light">
            EXPLORE BY CATEGORY
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base font-light">
            Select a tailored department to discover handcrafted pieces designed for distinction.
          </p>
        </div>

        {/* Categories Grid (Top 2 large, bottom 3 smaller) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const isWide = idx === 0 || idx === 1;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-amber-400/50 transition-all duration-500 shadow-xl ${
                  isWide ? "lg:col-span-1 md:h-[460px] h-[380px]" : "h-[380px]"
                }`}
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-85 group-hover:brightness-95"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity" />

                {/* Badge */}
                {cat.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/70 border border-amber-400/30 text-amber-300 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                      {cat.badge}
                    </span>
                  </div>
                )}

                {/* Item Count */}
                <div className="absolute top-4 right-4">
                  <span className="text-xs text-zinc-300 font-medium bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10">
                    {cat.itemCount}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-serif text-white tracking-wide group-hover:text-amber-200 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1 font-light line-clamp-1">
                    {cat.subtitle}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 group-hover:text-amber-300">
                    <span>View Collection</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
