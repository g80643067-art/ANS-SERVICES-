export type ProductCategory = "All" | "Men" | "Women" | "Streetwear" | "Ethnic Wear" | "New Arrivals";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: "Men" | "Women" | "Streetwear" | "Ethnic Wear";
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  description: string;
  details: string[];
  fabricCare: string[];
  tag?: string;
  inStock: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  id: string; // unique item id combining product id, size, and color
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}
