import React, { useState } from 'react';
import { Heart, ShoppingCart, Box, Zap, Package } from 'lucide-react';
import { Product } from './types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, selectedSize?: string) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onSelectProduct: (product: Product) => void;
  onOpen3DViewer: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onSelectProduct,
  onOpen3DViewer,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes ? product.sizes[0] : '');

  return (
    <div className="group bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden shadow-sm flex flex-col transition-all duration-300 hover:border-black hover:shadow-md hover:-translate-y-1">
      
      {/* Image & Badges Container */}
      <div className="relative aspect-square w-full bg-[#F7F7F7] overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Discount Badge */}
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black text-white font-extrabold text-[11px] tracking-wider shadow-md">
            {product.discount}% OFF
          </span>
        )}

        {/* Fast Delivery Badge for Groceries */}
        {product.isFastDelivery && (
          <span className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-white border border-[#E5E5E5] text-black font-extrabold text-[10px] tracking-wider shadow-md flex items-center gap-1">
            <Zap className="w-3 h-3 fill-black text-black" />
            10–30 MIN
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-colors ${
            isWishlisted
              ? 'bg-black text-white shadow-md'
              : 'bg-white/80 text-black hover:bg-black hover:text-white border border-[#E5E5E5]'
          }`}
          title="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* 3D View Badge */}
        {product.has3DModel && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen3DViewer(product);
            }}
            className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/90 border border-[#E5E5E5] text-black text-[11px] font-bold backdrop-blur-md hover:bg-black hover:text-white transition-all shadow-md"
          >
            <Box className="w-3.5 h-3.5 text-black" />
            <span>VIEW IN 3D</span>
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Brand & Rating */}
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-[#666666] font-semibold uppercase tracking-wider">{product.brand}</span>
          <div className="flex items-center gap-1 bg-[#F7F7F7] border border-[#E5E5E5] px-1.5 py-0.5 rounded text-black font-bold text-[11px]">
            <Package className="w-3 h-3 text-black" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 
          onClick={() => onSelectProduct(product)}
          className="font-bold text-sm text-black line-clamp-2 hover:underline cursor-pointer mb-2 flex-1"
        >
          {product.name}
        </h3>

        {/* Sizes if applicable */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(sz);
                  }}
                  className={`px-2 py-0.5 text-[11px] font-bold rounded border transition-all ${
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

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-2 border-t border-[#E5E5E5] mt-auto">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-black">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-[#666666] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product, selectedSize)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black hover:bg-[#222222] text-white text-xs font-bold shadow-sm transition-all transform active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

      </div>
    </div>
  );
};
