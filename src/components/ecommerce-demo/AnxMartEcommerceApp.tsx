import React, { useState } from 'react';
import { Header } from './Header';
import { HeroBanner } from './HeroBanner';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';
import { ThreeDViewerModal } from './ThreeDViewerModal';
import { CartDrawer } from './CartDrawer';
import { CheckoutModal } from './CheckoutModal';
import { OrderSuccessModal } from './OrderSuccessModal';
import { OrdersPage } from './OrdersPage';
import { MOCK_PRODUCTS } from './productsData';
import { Product, CartItem, Order, ProductCategory } from './types';
import { Sparkles, Zap, Flame, Star, Package, Filter } from 'lucide-react';

interface AnxMartEcommerceAppProps {
  onBackToAgency: () => void;
}

export const AnxMartEcommerceApp: React.FC<AnxMartEcommerceAppProps> = ({ onBackToAgency }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: MOCK_PRODUCTS[0], quantity: 1 } // Sample initial cart item
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['el-2', 'cl-1']);
  const [orders, setOrders] = useState<Order[]>([]);

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [product3D, setProduct3D] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [checkoutOpen, setCheckoutOpen] = useState<boolean>(false);
  const [orderSuccessData, setOrderSuccessData] = useState<Order | null>(null);
  const [ordersPageOpen, setOrdersPageOpen] = useState<boolean>(false);

  // Checkout totals temporary state
  const [checkoutSubtotal, setCheckoutSubtotal] = useState<number>(0);
  const [checkoutDiscount, setCheckoutDiscount] = useState<number>(0);
  const [checkoutTotal, setCheckoutTotal] = useState<number>(0);

  React.useEffect(() => {
    const handleAgentAction = (e: any) => {
      const { action } = e.detail;
      const act = action.toLowerCase();
      
      if (act.includes("cart") || act.includes("basket")) setCartOpen(true);
      if (act.includes("close") && cartOpen) setCartOpen(false);
      if (act.includes("checkout")) {
        setCartOpen(false);
        setCheckoutOpen(true);
      }
      if (act.includes("order")) setOrdersPageOpen(true);
      if (act.includes("category") || act.includes("filter") || act.includes("shop")) {
        document.getElementById("shop-section")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("AGENT_ACTION", handleAgentAction);
    return () => window.removeEventListener("AGENT_ACTION", handleAgentAction);
  }, [cartOpen]);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, selectedSize?: string, selectedColor?: string) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        i => i.product.id === product.id && i.selectedSize === selectedSize && i.selectedColor === selectedColor
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      }
      return [...prev, { product, quantity, selectedSize, selectedColor }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, qty: number, selectedSize?: string) => {
    if (qty <= 0) {
      handleRemoveItem(productId, selectedSize);
      return;
    }
    setCartItems(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedSize === selectedSize) {
        return { ...item, quantity: qty };
      }
      return item;
    }));
  };

  const handleRemoveItem = (productId: string, selectedSize?: string) => {
    setCartItems(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === selectedSize)));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleBuyNow = (product: Product, quantity = 1, selectedSize?: string, selectedColor?: string) => {
    const singleItemCart: CartItem[] = [{ product, quantity, selectedSize, selectedColor }];
    setCartItems(singleItemCart);
    const sub = product.price * quantity;
    setCheckoutSubtotal(sub);
    setCheckoutDiscount(0);
    setCheckoutTotal(sub > 499 ? sub : sub + 40);
    setSelectedProduct(null);
    setCheckoutOpen(true);
  };

  // Filter products
  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (ordersPageOpen) {
    return (
      <OrdersPage
        orders={orders}
        onBackToStore={() => setOrdersPageOpen(false)}
        onBackToAgency={onBackToAgency}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      
      {/* Header */}
      <Header
        onBackToAgency={onBackToAgency}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => {
          setSelectedCategory('all');
        }}
        onOpenOrders={() => setOrdersPageOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Banner (Only shown on 'all' category without search query) */}
      {selectedCategory === 'all' && !searchQuery && (
        <HeroBanner onSelectCategory={setSelectedCategory} />
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Section Title */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E5E5] pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-black uppercase font-sans flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-black" />
              <span>{selectedCategory === 'all' ? 'Trending Products & Deals' : `${selectedCategory.toUpperCase()} COLLECTION`}</span>
            </h2>
            <p className="text-xs text-[#666666] mt-1">Showing {filteredProducts.length} premium items with verified demo ratings</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#666666] font-semibold">Sort by:</span>
            <select className="bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl px-3 py-1.5 text-xs text-black font-medium focus:outline-none">
              <option>Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#F7F7F7] rounded-3xl border border-[#E5E5E5] p-8 space-y-3">
            <h3 className="text-lg font-bold text-black">No products found</h3>
            <p className="text-xs text-[#666666]">Try searching for something else or switch categories.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-5 py-2 rounded-xl bg-black text-white font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(prod, sz) => handleAddToCart(prod, 1, sz)}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
                onSelectProduct={setSelectedProduct}
                onOpen3DViewer={setProduct3D}
              />
            ))}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-[#F7F7F7] border-t border-[#E5E5E5] py-12 px-4 sm:px-6 lg:px-8 text-center text-xs text-[#666666] space-y-4">
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white font-black">
            ANX
          </div>
          <span className="font-bold text-sm text-black">ANX MART E-COMMERCE DEMO</span>
        </div>
        <p>© 2026 ANX Agency Portfolio Demo. All simulated payments and deliveries are for demonstration purposes.</p>
        <button
          onClick={onBackToAgency}
          className="text-black font-bold underline hover:text-[#222222]"
        >
          Return to ANX Agency Main Website
        </button>
      </footer>

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(prod, qty, sz, col) => handleAddToCart(prod, qty, sz, col)}
        onBuyNow={handleBuyNow}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onOpen3DViewer={setProduct3D}
      />

      <ThreeDViewerModal
        product={product3D}
        onClose={() => setProduct3D(null)}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={(sub, disc, tot) => {
          setCheckoutSubtotal(sub);
          setCheckoutDiscount(disc);
          setCheckoutTotal(tot);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cartItems}
        subtotal={checkoutSubtotal}
        discount={checkoutDiscount}
        totalAmount={checkoutTotal}
        onOrderSuccess={(order) => {
          setCheckoutOpen(false);
          setCartItems([]);
          setOrders(prev => [order, ...prev]);
          setOrderSuccessData(order);
        }}
      />

      <OrderSuccessModal
        order={orderSuccessData}
        onClose={() => setOrderSuccessData(null)}
        onViewOrders={() => setOrdersPageOpen(true)}
      />

    </div>
  );
};
