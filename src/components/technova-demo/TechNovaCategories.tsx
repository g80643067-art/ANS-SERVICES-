import React from "react";
import {
  Smartphone,
  Laptop,
  Tv,
  Tablet,
  Watch,
  Headphones,
  Gamepad2,
  Cpu,
  ArrowUpRight,
} from "lucide-react";
import { CATEGORIES_DATA } from "./technovaData";
import { ElectronicsCategory } from "./types";

interface TechNovaCategoriesProps {
  selectedCategory: ElectronicsCategory;
  onSelectCategory: (cat: ElectronicsCategory) => void;
}

export function TechNovaCategories({ selectedCategory, onSelectCategory }: TechNovaCategoriesProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case "Smartphone":
        return <Smartphone className="w-5 h-5" />;
      case "Laptop":
        return <Laptop className="w-5 h-5" />;
      case "Tv":
        return <Tv className="w-5 h-5" />;
      case "Tablet":
        return <Tablet className="w-5 h-5" />;
      case "Watch":
        return <Watch className="w-5 h-5" />;
      case "Headphones":
        return <Headphones className="w-5 h-5" />;
      case "Gamepad2":
        return <Gamepad2 className="w-5 h-5" />;
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <section id="categories" className="py-16 bg-[#080B13] border-b border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-black tracking-widest text-cyan-400 uppercase mb-2">Explore TechNova Ecosystem</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              POPULAR CATEGORIES
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md">
            Click any category to filter our catalog of next-generation gadgets, audio gear, and personal computing hardware.
          </p>
        </div>

        {/* 8 Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES_DATA.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative rounded-2xl overflow-hidden p-5 cursor-pointer border transition-all duration-300 transform hover:-translate-y-1.5 ${
                  isSelected
                    ? "bg-cyan-950/40 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.35)]"
                    : "bg-[#0D121F] border-slate-800/80 hover:border-cyan-500/40 hover:bg-[#111728] shadow-lg"
                }`}
              >
                {/* Background image preview with dark gradient */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity overflow-hidden pointer-events-none">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D121F] via-[#0D121F]/80 to-transparent" />
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                          : "bg-slate-800/90 text-cyan-400 group-hover:bg-cyan-950 group-hover:text-cyan-300"
                      }`}
                    >
                      {getIcon(cat.iconName)}
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 group-hover:text-cyan-400 flex items-center gap-0.5">
                      <span>{cat.itemCount} items</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-1">{cat.description}</p>
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
