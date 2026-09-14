import React, { useState } from "react";
import { FoodCategory, FoodItem, CartItem } from "../../types";
import { FOOD_MENU_ITEMS } from "../../data/foodMenuData";
import { FoodNavbar } from "./FoodNavbar";
import { FoodHero } from "./FoodHero";
import { FoodMenuSection } from "./FoodMenuSection";
import { FoodAboutSection } from "./FoodAboutSection";
import { FoodContactSection } from "./FoodContactSection";
import { FoodCartDrawer } from "./FoodCartDrawer";
import { FoodBottomBar } from "./FoodBottomBar";
import { CoverFlowCarousel } from "@/components/ui/3-d-coverflow-carousel";
import { BackToAnxFloatingButton } from "../ui/BackToAnxFloatingButton";
import {
  Flame,
  ArrowUp,
  Heart,
  Phone,
  MessageCircle,
  Instagram,
  ArrowLeft,
} from "lucide-react";

interface FoodDemoAppProps {
  onBackToAgency: () => void;
}

export function FoodDemoApp({ onBackToAgency }: FoodDemoAppProps) {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Pre-populate with 2 popular items so the cart UI looks immediately enticing!
    {
      food: FOOD_MENU_ITEMS[0], // Maharaja Crispy Paneer Burger
      quantity: 1,
    },
    {
      food: FOOD_MENU_ITEMS[4], // Steamed Chicken Momos
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  React.useEffect(() => {
    const handleAgentAction = (e: any) => {
      const { action } = e.detail;
      const act = action.toLowerCase();
      if (act.includes("menu")) {
        document.getElementById("food-menu")?.scrollIntoView({ behavior: "smooth" });
      } else if (act.includes("about")) {
        document.getElementById("food-about")?.scrollIntoView({ behavior: "smooth" });
      } else if (act.includes("contact")) {
        document.getElementById("food-contact")?.scrollIntoView({ behavior: "smooth" });
      } else if (act.includes("cart") || act.includes("order") || act.includes("checkout")) {
        setIsCartOpen(true);
      } else if (act.includes("close") && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener("AGENT_ACTION", handleAgentAction);
    return () => window.removeEventListener("AGENT_ACTION", handleAgentAction);
  }, [isCartOpen]);

  const handleAddToCart = (item: FoodItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.food.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.food.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { food: item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((ci) => {
          if (ci.food.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.food.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToMenu = () => {
    document.getElementById("food-menu")?.scrollIntoView({ behavior: "smooth" });
  };

  const totalCartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="relative min-h-screen bg-[#08090c] text-white selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[5%] left-[20%] w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-red-600/8 rounded-full blur-[160px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] bg-orange-700/8 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Sticky Header */}
        <FoodNavbar
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onBackToAgency={onBackToAgency}
        />

        <main className="flex-grow">
          {/* Hero section */}
          <FoodHero
            onExploreMenu={scrollToMenu}
            onOrderNow={() => setIsCartOpen(true)}
          />

          {/* 3D Chef's Special Coverflow Showcase */}
          <div className="relative border-y border-zinc-800/80 bg-[#0c0a09]">
            <CoverFlowCarousel
              sectionLabel="CHEF'S SIGNATURE SPECIALS"
              onCtaClick={() => scrollToMenu()}
            />
          </div>

          {/* Full Interactive Menu */}
          <FoodMenuSection
            menuItems={FOOD_MENU_ITEMS}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenCart={() => setIsCartOpen(true)}
          />

          {/* About Street Food Story */}
          <FoodAboutSection />

          {/* Contact & Map section */}
          <FoodContactSection />
        </main>

        {/* Restaurant Footer */}
        <footer className="bg-zinc-950 border-t border-zinc-800/80 pt-12 pb-24 lg:pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Flame className="w-5 h-5 fill-amber-500" />
              </div>
              <div>
                <span className="text-base font-black text-white">DESI CRAVE</span>
                <p className="text-xs text-zinc-400">Authentic Street Food Kitchen & Takeaway</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-zinc-400">
              <span>© {new Date().getFullYear()} Desi Crave Street Food.</span>
              <span>•</span>
              <button
                onClick={() => {
                  if (onBackToAgency) {
                    onBackToAgency();
                  } else {
                    window.location.href = window.location.origin + window.location.pathname;
                  }
                }}
                className="text-purple-400 hover:text-purple-300 font-bold underline cursor-pointer"
              >
                Website by ANX Development • Back to ANX Site
              </button>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/917348382816"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-zinc-800"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-pink-400 border border-zinc-800"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="tel:+917348382816"
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-zinc-800"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </footer>

        {/* Mobile bottom sticky bar */}
        <FoodBottomBar
          cartItems={cartItems}
          onOpenCart={() => setIsCartOpen(true)}
          onScrollToMenu={scrollToMenu}
        />

        {/* Floating Return to ANX Button */}
        <BackToAnxFloatingButton onBackToAgency={onBackToAgency} theme="dark" />

        {/* Cart Drawer */}
        <FoodCartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />
      </div>
    </div>
  );
}
