import React, { useState, useEffect } from "react";
import { TechNovaNavbar } from "./TechNovaNavbar";
import { TechNovaHero } from "./TechNovaHero";
import { TechNovaCategories } from "./TechNovaCategories";
import { TechNovaDealsSection } from "./TechNovaDealsSection";
import { TechNovaNewArrivalsSlider } from "./TechNovaNewArrivalsSlider";
import { TechNovaProductGrid } from "./TechNovaProductGrid";
import { TechNovaWhyChooseUs } from "./TechNovaWhyChooseUs";
import { TechNovaFooter } from "./TechNovaFooter";
import { TechNovaProductModal } from "./TechNovaProductModal";
import { TechNovaCartDrawer } from "./TechNovaCartDrawer";
import { TechNovaWishlistDrawer } from "./TechNovaWishlistDrawer";
import { PRODUCTS_DATA } from "./technovaData";
import { ElectronicsProduct, ElectronicsCategory, CartItem, ProductVariant } from "./types";
import { CheckCircle2, Heart, ShoppingBag } from "lucide-react";
import { BackToAnxFloatingButton } from "../ui/BackToAnxFloatingButton";

interface TechNovaDemoAppProps {
  onBackToAgency?: () => void;
}

export function TechNovaDemoApp({ onBackToAgency }: TechNovaDemoAppProps) {
  // Products dataset
  const [products] = useState<ElectronicsProduct[]>(PRODUCTS_DATA);

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState<ElectronicsCategory>("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Modals & Drawers states
  const [selectedProduct, setSelectedProduct] = useState<ElectronicsProduct | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    return [
      {
        cartItemId: "item-init-1",
        product: PRODUCTS_DATA[0], // NovaPhone 16 Pro Max
        selectedVariant: PRODUCTS_DATA[0].variants[0],
        quantity: 1,
      },
    ];
  });

  // Wishlist state (set of product IDs)
  const [wishlistIds, setWishlistIds] = useState<string[]>(["tech-4"]);

  // Quick toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Scroll helper
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    const handleAgentAction = (e: any) => {
      const { action } = e.detail;
      const act = action.toLowerCase();
      
      if (act.includes("cart") || act.includes("basket")) setCartOpen(true);
      if (act.includes("close") && cartOpen) setCartOpen(false);
      if (act.includes("wishlist")) setWishlistOpen(true);
      if (act.includes("shop") || act.includes("product")) {
        handleScrollToSection("shop-section");
      }
    };
    window.addEventListener("AGENT_ACTION", handleAgentAction);
    return () => window.removeEventListener("AGENT_ACTION", handleAgentAction);
  }, [cartOpen, wishlistOpen]);

  // Cart operations
  const handleAddToCart = (product: ElectronicsProduct, variant?: ProductVariant, quantity: number = 1) => {
    const effectiveVariant = variant || (product.variants && product.variants[0] ? product.variants[0] : undefined);
    const cartItemId = `${product.id}-${effectiveVariant?.name || "default"}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          product,
          selectedVariant: effectiveVariant,
          quantity,
        },
      ];
    });

    showToast(`Added "${product.name}" to cart`);
  };

  const handleBuyNow = (product: ElectronicsProduct, variant?: ProductVariant, quantity: number = 1) => {
    handleAddToCart(product, variant, quantity);
    setSelectedProduct(null);
    setCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: ElectronicsProduct) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        showToast(`Removed "${product.name}" from wishlist`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to wishlist`);
        return [...prev, product.id];
      }
    });
  };

  const handleRemoveFromWishlist = (product: ElectronicsProduct) => {
    setWishlistIds((prev) => prev.filter((id) => id !== product.id));
  };

  // Filtered views for sub-sections
  const dealProducts = products.filter((p) => p.isDeal);
  const newArrivalProducts = products.filter((p) => p.isNewArrival || p.badge?.includes("NEW") || p.category === "Gaming");
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Set document title
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "TECHNOVA | Premium Electronics & Smart Devices Store";
    return () => {
      document.title = originalTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#07090E] text-white flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-60 px-4 py-3 rounded-2xl bg-cyan-950/95 border border-cyan-400 text-white text-xs font-bold flex items-center gap-2 shadow-[0_10px_30px_rgba(6,182,212,0.4)] backdrop-blur-md animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header & Navbar */}
      <TechNovaNavbar
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={(val) => {
          setSearchTerm(val);
          if (val) handleScrollToSection("products");
        }}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleScrollToSection("products");
        }}
        onScrollToSection={handleScrollToSection}
        onBackToAgency={onBackToAgency}
      />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <TechNovaHero
          onShopNow={() => handleScrollToSection("products")}
          onExploreDeals={() => handleScrollToSection("deals")}
        />

        {/* 3. Categories Section */}
        <TechNovaCategories
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            handleScrollToSection("products");
          }}
        />

        {/* 4. Today's Best Deals with Countdown */}
        <TechNovaDealsSection
          dealProducts={dealProducts}
          onQuickView={(p) => setSelectedProduct(p)}
          onAddToCart={(p) => handleAddToCart(p)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* 5. New Arrivals Horizontal Slider */}
        <TechNovaNewArrivalsSlider
          newArrivalProducts={newArrivalProducts}
          onQuickView={(p) => setSelectedProduct(p)}
          onAddToCart={(p) => handleAddToCart(p)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* 6 & 7. Hardware Catalog with Search, Sorting, Filtering */}
        <TechNovaProductGrid
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onQuickView={(p) => setSelectedProduct(p)}
          onAddToCart={(p) => handleAddToCart(p)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* 8. Why Choose Us */}
        <TechNovaWhyChooseUs />
      </main>

      {/* 9. Rich Footer */}
      <TechNovaFooter
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleScrollToSection("products");
        }}
        onScrollToSection={handleScrollToSection}
        onBackToAgency={onBackToAgency}
      />

      {/* Floating Return to ANX Button */}
      <BackToAnxFloatingButton onBackToAgency={onBackToAgency} theme="cyber" />

      {/* Product Details / Quick View Modal */}
      <TechNovaProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, v, q) => {
          handleAddToCart(p, v, q);
          setSelectedProduct(null);
        }}
        onBuyNow={(p, v, q) => handleBuyNow(p, v, q)}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
      />

      {/* Cart Drawer */}
      <TechNovaCartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Drawer */}
      <TechNovaWishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={(p) => handleAddToCart(p)}
        onQuickView={(p) => {
          setWishlistOpen(false);
          setSelectedProduct(p);
        }}
      />
    </div>
  );
}
