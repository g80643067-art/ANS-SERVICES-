import React, { useState, useEffect } from "react";
import {
  BakeryProduct,
  CartItem,
  ProductCategory,
} from "./types";
import {
  BAKERY_PRODUCTS,
  SPECIAL_OFFERS,
  SpecialOfferItem,
} from "./bakeryData";
import { SweetCrustNavbar } from "./SweetCrustNavbar";
import { SweetCrustHero } from "./SweetCrustHero";
import { SweetCrustCategories } from "./SweetCrustCategories";
import { SweetCrustBestSellers } from "./SweetCrustBestSellers";
import { SweetCrustCustomCakes } from "./SweetCrustCustomCakes";
import { SweetCrustSpecialOffers } from "./SweetCrustSpecialOffers";
import { SweetCrustProductModal } from "./SweetCrustProductModal";
import { SweetCrustCartDrawer } from "./SweetCrustCartDrawer";
import { SweetCrustWishlistDrawer } from "./SweetCrustWishlistDrawer";
import { SweetCrustAboutUs } from "./SweetCrustAboutUs";
import { SweetCrustGallery } from "./SweetCrustGallery";
import { SweetCrustContactSection } from "./SweetCrustContactSection";
import { SweetCrustFooter } from "./SweetCrustFooter";
import { BackToAnxFloatingButton } from "../ui/BackToAnxFloatingButton";

interface SweetCrustBakeryAppProps {
  onBackToAgency?: () => void;
}

export function SweetCrustBakeryApp({ onBackToAgency }: SweetCrustBakeryAppProps) {
  // Cart State (Initialized with 1 Fresh Croissant and 1 Chocolate Truffle Cake for an immediate welcoming feel)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "cart-item-1",
      product: BAKERY_PRODUCTS[0], // Chocolate Truffle Cake
      selectedSize: BAKERY_PRODUCTS[0].sizes[0],
      quantity: 1,
    },
    {
      id: "cart-item-2",
      product: BAKERY_PRODUCTS[2], // Fresh Croissant
      selectedSize: BAKERY_PRODUCTS[2].sizes[0],
      quantity: 2,
    },
  ]);

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    "red-velvet-cake",
    "blueberry-cheesecake",
  ]);

  // UI State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<BakeryProduct | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Set document title
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "SWEET CRUST • Artisan Bakehouse & Patisserie";

    const handleAgentAction = (e: any) => {
      const { action } = e.detail;
      const act = action.toLowerCase();
      
      if (act.includes("cart") || act.includes("basket")) setIsCartOpen(true);
      if (act.includes("close") && isCartOpen) setIsCartOpen(false);
      if (act.includes("wishlist")) setIsWishlistOpen(true);
      if (act.includes("menu") || act.includes("shop")) {
        document.getElementById("full-menu")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("AGENT_ACTION", handleAgentAction);

    return () => {
      document.title = originalTitle;
      window.removeEventListener("AGENT_ACTION", handleAgentAction);
    };
  }, [isCartOpen, isWishlistOpen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Cart Calculations
  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Cart Handlers
  const handleAddToCart = (product: BakeryProduct, size?: string, quantity: number = 1) => {
    const chosenSize = size || product.sizes[0] || "Standard";
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.product.id === product.id && i.selectedSize === chosenSize
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          product,
          selectedSize: chosenSize,
          quantity,
        };
        return [...prev, newItem];
      }
    });
    showToast(`Added ${quantity}x "${product.name}" to basket!`);
  };

  const handleBuyNow = (product: BakeryProduct, size: string, quantity: number) => {
    handleAddToCart(product, size, quantity);
    setSelectedProductForModal(null);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(itemId);
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, quantity: newQty } : i))
      );
    }
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (productId: string) => {
    const isSaved = wishlistIds.includes(productId);
    if (isSaved) {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      showToast("Removed from favorites");
    } else {
      setWishlistIds((prev) => [...prev, productId]);
      showToast("Saved to your favorites! ❤️");
    }
  };

  // Special Offer Claim Handler
  const handleClaimOffer = (offer: SpecialOfferItem) => {
    // Look for matching product or add best seller cake
    const targetProduct =
      BAKERY_PRODUCTS.find((p) => p.category === "cakes") || BAKERY_PRODUCTS[0];
    handleAddToCart(targetProduct, "Special Bundle: " + offer.title, 1);
    setIsCartOpen(true);
  };

  // Filter products by search query and category
  const filteredProducts = BAKERY_PRODUCTS.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const wishlistProducts = BAKERY_PRODUCTS.filter((p) =>
    wishlistIds.includes(p.id)
  );

  // Smooth scroll handler
  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#3C2415] font-sans antialiased selection:bg-[#E6A15C]/40 selection:text-[#3C2415]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#3C2415] text-[#FFFDF9] px-5 py-3 rounded-2xl shadow-2xl border border-[#52331E] text-xs sm:text-sm font-bold animate-in slide-in-from-bottom-5 duration-200 flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Navbar */}
      <SweetCrustNavbar
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        cartSubtotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateSection={handleNavigateSection}
        onBackToAgency={onBackToAgency}
      />

      <main>
        {/* 2. Hero Section */}
        <SweetCrustHero
          onExploreMenu={() => handleNavigateSection("best-sellers")}
          onCustomCakes={() => handleNavigateSection("custom-cakes")}
        />

        {/* 3. Categories (8 Cards) */}
        <SweetCrustCategories
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            handleNavigateSection("best-sellers");
          }}
        />

        {/* 4. Best Sellers & Full Menu */}
        <SweetCrustBestSellers
          products={filteredProducts}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={(product, size) => handleAddToCart(product, size, 1)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onOpenProductModal={(product) => setSelectedProductForModal(product)}
        />

        {/* 5. Custom Cakes Builder */}
        <SweetCrustCustomCakes />

        {/* 6. Special Offers Banner & Cards */}
        <SweetCrustSpecialOffers onClaimOffer={handleClaimOffer} />

        {/* 7. About Us Heritage Story */}
        <SweetCrustAboutUs />

        {/* 8. Visual Bakehouse Gallery */}
        <SweetCrustGallery />

        {/* 9. Contact / Order Section */}
        <SweetCrustContactSection />
      </main>

      {/* 10. Footer */}
      <SweetCrustFooter
        onNavigateSection={handleNavigateSection}
        onBackToAgency={onBackToAgency}
      />

      {/* Floating Return to ANX Button */}
      <BackToAnxFloatingButton onBackToAgency={onBackToAgency} theme="warm" />

      {/* Product Details Modal */}
      <SweetCrustProductModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isWishlisted={
          selectedProductForModal
            ? wishlistIds.includes(selectedProductForModal.id)
            : false
        }
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Cart Drawer */}
      <SweetCrustCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onBrowseMenu={() => handleNavigateSection("best-sellers")}
      />

      {/* Wishlist Drawer */}
      <SweetCrustWishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={(product) => handleAddToCart(product)}
        onOpenProductModal={(product) => setSelectedProductForModal(product)}
      />
    </div>
  );
}
