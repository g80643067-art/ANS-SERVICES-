import React, { useState, useEffect } from "react";
import { NovaNavbar } from "./NovaNavbar";
import { NovaHero } from "./NovaHero";
import { NovaCategoriesSection } from "./NovaCategoriesSection";
import { NovaProductGrid } from "./NovaProductGrid";
import { NovaProductModal } from "./NovaProductModal";
import { NovaNewArrivalsSlider } from "./NovaNewArrivalsSlider";
import { NovaSpecialOffers } from "./NovaSpecialOffers";
import { NovaLookbookGallery } from "./NovaLookbookGallery";
import { NovaAboutSection } from "./NovaAboutSection";
import { NovaContactSection } from "./NovaContactSection";
import { NovaFooter } from "./NovaFooter";
import { NovaCartDrawer } from "./NovaCartDrawer";
import { NovaWishlistDrawer } from "./NovaWishlistDrawer";
import { NOVA_PRODUCTS } from "./clothesData";
import { Product, ProductCategory, CartItem, ProductColor } from "./types";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { BackToAnxFloatingButton } from "../ui/BackToAnxFloatingButton";

interface ClothesDemoAppProps {
  onBackToAgency: () => void;
}

export function ClothesDemoApp({ onBackToAgency }: ClothesDemoAppProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // Cart state initialized with 1 luxury starter item so user can immediately inspect the bag experience
  const [cartItems, setCartItems] = useState<CartItem[]>(() => [
    {
      id: "w-1-S-#D4AF37",
      product: NOVA_PRODUCTS[0],
      selectedSize: "S",
      selectedColor: NOVA_PRODUCTS[0].colors[0],
      quantity: 1,
    },
  ]);

  // Wishlist state
  const [wishlistProductIds, setWishlistProductIds] = useState<string[]>(["w-1", "m-1"]);

  // Scroll to section helper
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  React.useEffect(() => {
    const handleAgentAction = (e: any) => {
      const { action } = e.detail;
      const act = action.toLowerCase();
      
      if (act.includes("cart") || act.includes("bag")) setCartOpen(true);
      if (act.includes("close") && cartOpen) setCartOpen(false);
      if (act.includes("wishlist")) setWishlistOpen(true);
      if (act.includes("shop") || act.includes("collection")) {
        handleScrollToSection("shop");
      }
    };
    window.addEventListener("AGENT_ACTION", handleAgentAction);
    return () => window.removeEventListener("AGENT_ACTION", handleAgentAction);
  }, [cartOpen, wishlistOpen]);

  // Add to cart handler
  const handleAddToCart = (
    product: Product,
    selectedSize?: string,
    selectedColor?: ProductColor,
    quantity: number = 1
  ) => {
    const size = selectedSize || product.sizes[0] || "M";
    const color = selectedColor || product.colors[0] || { name: "Default", hex: "#000" };
    const itemId = `${product.id}-${size}-${color.hex}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, product, selectedSize: size, selectedColor: color, quantity }];
    });
  };

  const handleUpdateCartQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist handler
  const handleToggleWishlist = (product: Product) => {
    setWishlistProductIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      return [...prev, product.id];
    });
  };

  const isWishlisted = (productId: string) => wishlistProductIds.includes(productId);

  const wishlistProducts = NOVA_PRODUCTS.filter((p) => wishlistProductIds.includes(p.id));

  // Category select with auto scroll
  const handleSelectCategory = (cat: ProductCategory) => {
    setActiveCategory(cat);
    handleScrollToSection("nova-products");
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#070709] text-white selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden font-sans">
      {/* 1. Header Navigation Bar */}
      <NovaNavbar
        onBackToAgency={onBackToAgency}
        cartCount={totalCartCount}
        wishlistCount={wishlistProductIds.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onScrollToSection={handleScrollToSection}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main>
        {/* 2. Luxury Hero Section */}
        <NovaHero
          onExploreClick={() => handleScrollToSection("nova-products")}
          onViewLookbook={() => handleScrollToSection("nova-lookbook")}
          onSelectCategory={handleSelectCategory}
        />

        {/* 3. Category Showcase Grid */}
        <NovaCategoriesSection onSelectCategory={handleSelectCategory} />

        {/* 4. Products Catalog (Filterable, Searchable, Sortable) */}
        <NovaProductGrid
          products={NOVA_PRODUCTS}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenProductModal={(product) => setSelectedProduct(product)}
          onAddToCart={(product, size, color) => handleAddToCart(product, size, color ? { name: "", hex: color } : undefined, 1)}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={isWishlisted}
        />

        {/* 5. New Arrivals Horizontal Carousel */}
        <NovaNewArrivalsSlider
          products={NOVA_PRODUCTS}
          onOpenProductModal={(product) => setSelectedProduct(product)}
          onAddToCart={(product) => handleAddToCart(product)}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={isWishlisted}
        />

        {/* 6. Special Offers & Runway Flash Sale */}
        <NovaSpecialOffers
          onShopOffers={() => {
            setActiveCategory("All");
            handleScrollToSection("nova-products");
          }}
        />

        {/* 7. Lookbook & Editorial Gallery */}
        <NovaLookbookGallery />

        {/* 8. About Atelier & Sustainability */}
        <NovaAboutSection />

        {/* 9. VIP Concierge & Styling Appointment */}
        <NovaContactSection />
      </main>

      {/* 10. Footer */}
      <NovaFooter
        onScrollToTop={handleScrollToTop}
        onSelectCategory={handleSelectCategory}
        onScrollToSection={handleScrollToSection}
        onBackToAgency={onBackToAgency}
      />

      {/* Floating Return to ANX Button */}
      <BackToAnxFloatingButton onBackToAgency={onBackToAgency} theme="warm" />

      {/* Product Detail Modal */}
      <NovaProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={isWishlisted}
      />

      {/* Shopping Bag Drawer */}
      <NovaCartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Drawer */}
      <NovaWishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(product) => handleAddToCart(product)}
        onOpenProductModal={(product) => setSelectedProduct(product)}
      />

      {/* Floating Quick Action Buttons */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
        {/* WhatsApp VIP Concierge */}
        <a
          href="https://wa.me/?text=Hello%20Nova%20Wear%20Concierge%2C%20I%20would%20like%20to%20inquire%20about%20a%20private%20bespoke%20fitting."
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-zinc-950 flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:scale-105 transition-all cursor-pointer"
          title="WhatsApp Concierge"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </a>

        {/* Quick Open Bag */}
        <button
          onClick={() => setCartOpen(true)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 flex items-center justify-center shadow-[0_8px_25px_rgba(245,158,11,0.4)] hover:scale-105 transition-all cursor-pointer relative"
          title="Open Shopping Bag"
        >
          <ShoppingBag className="w-5 h-5" />
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center border border-zinc-950">
              {totalCartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
