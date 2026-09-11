export type ElectronicsCategory =
  | "All"
  | "Smartphones"
  | "Laptops"
  | "Smart TVs"
  | "Tablets"
  | "Smartwatches"
  | "Headphones & Earbuds"
  | "Gaming"
  | "Accessories";

export interface ProductVariant {
  name: string;
  colorName?: string;
  colorHex?: string;
  storageOrSize?: string;
  priceModifier?: number;
}

export interface ProductSpec {
  name: string;
  value: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface ElectronicsProduct {
  id: string;
  name: string;
  brand: string;
  category: ElectronicsCategory;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  description: string;
  specs: ProductSpec[];
  variants: ProductVariant[];
  inStock: boolean;
  stockCount?: number;
  badge?: string; // e.g. "HOT DEAL -25%", "NEW ARRIVAL", "BEST SELLER"
  isDeal?: boolean;
  discountPercent?: number;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  reviews: CustomerReview[];
}

export interface CartItem {
  cartItemId: string;
  product: ElectronicsProduct;
  selectedVariant?: ProductVariant;
  quantity: number;
}
