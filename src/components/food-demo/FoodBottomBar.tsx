import React from "react";
import {
  ShoppingBag,
  Utensils,
  Phone,
  MessageCircle,
  Home,
} from "lucide-react";
import { CartItem } from "../../types";

interface FoodBottomBarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onScrollToMenu: () => void;
}

export function FoodBottomBar({
  cartItems,
  onOpenCart,
  onScrollToMenu,
}: FoodBottomBarProps) {
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-3 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Call button */}
        <a
          href="tel:+917348382816"
          className="flex flex-col items-center justify-center p-2 rounded-xl text-zinc-300 hover:text-amber-400 text-[10px] font-bold"
        >
          <Phone className="w-4 h-4 text-amber-400 mb-0.5" />
          <span>Call</span>
        </a>

        {/* WhatsApp button */}
        <a
          href="https://wa.me/917348382816"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-2 rounded-xl text-zinc-300 hover:text-emerald-400 text-[10px] font-bold"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span>WhatsApp</span>
        </a>

        {/* Menu button */}
        <button
          onClick={onScrollToMenu}
          className="flex flex-col items-center justify-center p-2 rounded-xl text-zinc-300 hover:text-amber-400 text-[10px] font-bold cursor-pointer"
        >
          <Utensils className="w-4 h-4 text-orange-400 mb-0.5" />
          <span>Menu</span>
        </button>

        {/* Main Cart CTA */}
        <button
          onClick={onOpenCart}
          className="flex-1 flex items-center justify-between px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-zinc-950 font-black text-xs shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4" />
            <span>{totalCount > 0 ? `${totalCount} items` : "Cart"}</span>
          </div>

          <div className="flex items-center gap-1">
            <span>{totalCount > 0 ? `₹${totalAmount}` : "View Cart"}</span>
            <span>→</span>
          </div>
        </button>
      </div>
    </div>
  );
}
