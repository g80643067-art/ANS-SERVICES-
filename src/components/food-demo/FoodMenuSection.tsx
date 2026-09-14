import React, { useState } from "react";
import {
  Search,
  Plus,
  Minus,
  Flame,
  Clock,
  Sparkles,
  ShoppingBag,
  Filter,
} from "lucide-react";
import { FoodCategory, FoodItem, CartItem } from "../../types";

interface FoodMenuSectionProps {
  menuItems: FoodItem[];
  cartItems: CartItem[];
  onAddToCart: (item: FoodItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  selectedCategory: FoodCategory;
  onSelectCategory: (category: FoodCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCart: () => void;
}

export function FoodMenuSection({
  menuItems,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenCart,
}: FoodMenuSectionProps) {
  const [dietFilter, setDietFilter] = useState<"all" | "veg" | "non-veg">("all");

  const categories: { id: FoodCategory; label: string; icon: string }[] = [
    { id: "All", label: "All Items", icon: "✨" },
    { id: "Burgers", label: "Burgers", icon: "🍔" },
    { id: "Momos", label: "Momos", icon: "🥟" },
    { id: "Pizza", label: "Pizza", icon: "🍕" },
    { id: "Rolls", label: "Rolls & Frankie", icon: "🌯" },
    { id: "Fries", label: "Loaded Fries", icon: "🍟" },
    { id: "Beverages", label: "Beverages", icon: "🥤" },
    { id: "Combos", label: "Crave Combos", icon: "🍱" },
  ];

  // Filtering
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiet =
      dietFilter === "all" ||
      (dietFilter === "veg" && item.isVeg) ||
      (dietFilter === "non-veg" && !item.isVeg);

    return matchesCategory && matchesSearch && matchesDiet;
  });

  const getItemQuantity = (itemId: string) => {
    const found = cartItems.find((c) => c.food.id === itemId);
    return found ? found.quantity : 0;
  };

  return (
    <section id="food-menu" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Menu Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wider uppercase mb-3">
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Handcrafted Street Menu</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
          Explore Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
            Mouth-Watering Delights
          </span>
        </h2>
        <p className="text-zinc-300 text-sm sm:text-base">
          Prepared live with sizzling high heat, pure butter, farm-fresh ingredients, and our signature street spices.
        </p>
      </div>

      {/* Category Selection Tabs */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
        {categories.map((cat) => {
          const count =
            cat.id === "All"
              ? menuItems.length
              : menuItems.filter((i) => i.category === cat.id).length;
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-105"
                  : "bg-zinc-900/90 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-zinc-950 text-amber-400" : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Diet Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-800/90 mb-10 shadow-lg">
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by food name or ingredient..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Diet switches */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900 border border-zinc-800 self-stretch sm:self-auto justify-center">
          <button
            onClick={() => setDietFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              dietFilter === "all" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setDietFilter("veg")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              dietFilter === "veg"
                ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>Pure Veg</span>
          </button>
          <button
            onClick={() => setDietFilter("non-veg")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              dietFilter === "non-veg"
                ? "bg-red-950 text-red-300 border border-red-500/40"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
            <span>Non-Veg</span>
          </button>
        </div>
      </div>

      {/* Food Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl bg-zinc-950 border border-zinc-800">
          <p className="text-zinc-400 text-base mb-3">No items found matching your criteria.</p>
          <button
            onClick={() => {
              onSearchChange("");
              setDietFilter("all");
              onSelectCategory("All");
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 text-zinc-950"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const qty = getItemQuantity(item.id);

            return (
              <div
                key={item.id}
                className="group relative rounded-3xl overflow-hidden bg-zinc-950/90 border border-zinc-800/90 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)] flex flex-col justify-between"
              >
                {/* Image & Badges */}
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/40" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      {/* Veg / Non-Veg Indicator */}
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-950/90 border border-zinc-800 text-[10px] font-bold">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.isVeg ? "bg-emerald-500" : "bg-red-500"
                          }`}
                        />
                        <span className={item.isVeg ? "text-emerald-400" : "text-red-400"}>
                          {item.isVeg ? "VEG" : "NON-VEG"}
                        </span>
                      </div>

                      {/* Bestseller badge */}
                      {item.isBestseller && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 shadow-sm flex items-center gap-1">
                          <Flame className="w-3 h-3 fill-zinc-950" />
                          <span>BESTSELLER</span>
                        </span>
                      )}
                    </div>

                    {/* Bottom overlay info: Rating & Time */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-900/90 text-amber-300 font-bold border border-zinc-800">
                        <Flame className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{item.rating}</span>
                        <span className="text-zinc-500 text-[10px]">({item.reviewCount})</span>
                      </span>

                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-900/90 text-zinc-300 text-[11px] border border-zinc-800">
                        <Clock className="w-3 h-3 text-zinc-400" />
                        <span>{item.preparationTime}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 pb-3">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-3">
                      {item.description}
                    </p>

                    {/* Category and spice info */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                        {item.category}
                      </span>
                      {item.spiceLevel && (
                        <span className="text-[10px] text-orange-400 font-semibold" title={`Spice Level: ${item.spiceLevel}/3`}>
                          {"🌶️".repeat(item.spiceLevel)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pricing & Add to Cart Footer */}
                <div className="p-5 pt-3 border-t border-zinc-900 flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-white">₹{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-xs text-zinc-500 line-through">
                          ₹{item.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold">
                      Taxes Included
                    </span>
                  </div>

                  {/* Add / Quantity buttons */}
                  {qty === 0 ? (
                    <button
                      onClick={() => onAddToCart(item)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-950 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-zinc-900 border border-amber-500/50 rounded-xl p-1 shadow-sm">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-400 flex items-center justify-center font-black transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-black text-white px-1">{qty}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 flex items-center justify-center font-black transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
