export type ProductCategory =
  | "all"
  | "cakes"
  | "pastries"
  | "breads"
  | "cookies"
  | "donuts"
  | "cupcakes"
  | "desserts"
  | "beverages";

export interface BakeryReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface BakeryProduct {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  shortDesc: string;
  tags: string[];
  isBestSeller?: boolean;
  isSpecialOffer?: boolean;
  discountPercent?: number;
  sizes: string[];
  dietary: ("Eggless" | "Eggless Available" | "100% Butter" | "Gluten-Free" | "Vegan" | "Vegetarian" | "Nut-Free" | "Artisanal")[];
  ingredients?: string[];
  prepTime?: string;
  reviews: BakeryReview[];
}

export interface CartItem {
  id: string;
  product: BakeryProduct;
  selectedSize: string;
  quantity: number;
  specialInstructions?: string;
}

export interface CustomCakeOrder {
  flavor: string;
  size: string;
  tier: string;
  occasion: string;
  dietary: string;
  message: string;
  date: string;
  customerName: string;
  phone: string;
  email: string;
  deliveryType: "pickup" | "delivery";
  specialNotes: string;
}
