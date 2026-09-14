import React, { useState } from 'react';
import { X, Heart, ShoppingCart, Zap, Box, ShieldCheck, Truck, Plus, Minus, ArrowRight, Package } from 'lucide-react';
import { Product } from './types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  onBuyNow: (product: Product, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onOpen3DViewer: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  onOpen3DViewer,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes ? product.sizes[0] : '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors ? product.colors[0] : '');
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-[#E5E5E5] rounded-3xl shadow-2xl overflow-hidden text-black my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#F7F7F7] border border-[#E5E5E5] text-black hover:bg-black hover:text-white transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
          
          {/* Left Column - Gallery */}
          <div className="p-6 bg-[#F7F7F7] flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-[#E5E5E5]">
            <div className="relative aspect-square w-full max-w-md rounded-2xl overflow-hidden bg-white border border-[#E5E5E5] shadow-sm">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />

              {product.has3DModel && (
                <button
                  onClick={() => onOpen3DViewer(product)}
                  className="absolute bottom-4 left-4 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/90 border border-[#E5E5E5] text-black text-xs font-bold backdrop-blur-md hover:bg-black hover:text-white transition-all shadow-md"
                >
                  <Box className="w-4 h-4 text-black" />
                  <span>LAUNCH 3D VIEWER</span>
                </button>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === img ? 'border-black shadow-md' : 'border-[#E5E5E5] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-md bg-[#F7F7F7] border border-[#E5E5E5] text-[#666666] text-xs font-bold tracking-wider uppercase">
                  {product.category} / {product.subcategory}
                </span>

                <div className="flex items-center gap-1 bg-[#F7F7F7] border border-[#E5E5E5] px-2.5 py-1 rounded-lg text-black font-bold text-xs">
                  <Package className="w-3.5 h-3.5 text-black" />
                  <span>{product.rating}</span>
                  <span className="text-[#666666]">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-black leading-snug">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-extrabold text-black">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-[#666666] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                )}
                {product.discount > 0 && (
                  <span className="px-2.5 py-0.5 rounded bg-black text-white font-bold text-xs">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              <p className="text-sm text-[#666666] leading-relaxed">
                {product.description}
              </p>

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-black uppercase tracking-wider">Select Size:</label>
                  <div className="flex items-center gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                          selectedSize === sz
                            ? 'bg-black border-black text-white shadow-sm'
                            : 'bg-[#F7F7F7] border-[#E5E5E5] text-[#666666] hover:text-black hover:border-black'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-black uppercase tracking-wider">Select Color / Finish:</label>
                  <div className="flex items-center gap-2">
                    {product.colors.map((col) => (
                      <button
                        key={col}
                        onClick={() => setSelectedColor(col)}
                        className={`px-3.5 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                          selectedColor === col
                            ? 'bg-black border-black text-white shadow-sm'
                            : 'bg-[#F7F7F7] border-[#E5E5E5] text-[#666666] hover:text-black hover:border-black'
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-black uppercase tracking-wider">Quantity:</label>
                <div className="flex items-center w-32 border border-[#E5E5E5] rounded-xl bg-[#F7F7F7] overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 text-[#666666] hover:bg-[#E5E5E5]"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="flex-1 text-center text-sm font-bold text-black">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 text-[#666666] hover:bg-[#E5E5E5]"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-[#E5E5E5] space-y-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onAddToCart(product, quantity, selectedSize, selectedColor)}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white border-2 border-black text-black font-bold text-xs hover:bg-[#F7F7F7] transition-all shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => onBuyNow(product, quantity, selectedSize, selectedColor)}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-black hover:bg-[#222222] text-white font-bold text-xs shadow-md transition-all"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-colors text-xs font-semibold ${
                  isWishlisted
                    ? 'bg-black text-white border-black'
                    : 'bg-[#F7F7F7] border-[#E5E5E5] text-[#666666] hover:text-black'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
                <span>{isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
