export interface ServiceItem {
  id: string;
  title: string;
  badge?: string;
  description: string;
  highlights: string[];
  iconName: "Globe" | "Boxes" | "Sliders" | "BadgePercent" | "Sparkles" | "Laptop" | "Smartphone";
  gradient: string;
}

export interface DemoRequest {
  name: string;
  phone: string;
  serviceType: string;
  budget: string;
  notes: string;
}

export interface ContactInfo {
  phone1: string;
  phone2: string;
  whatsappNumber: string;
  instagramHandle: string;
  email: string;
}

export type FoodCategory =
  | "All"
  | "Burgers"
  | "Momos"
  | "Pizza"
  | "Rolls"
  | "Fries"
  | "Beverages"
  | "Combos";

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  isVeg: boolean;
  isBestseller?: boolean;
  isSpicy?: boolean;
  spiceLevel?: 1 | 2 | 3;
  rating: number;
  reviewCount: number;
  preparationTime: string;
}

export interface CartItem {
  food: FoodItem;
  quantity: number;
  specialInstructions?: string;
}

export interface FoodOrderDetails {
  customerName: string;
  phone: string;
  address: string;
  orderType: "delivery" | "takeaway" | "dinein";
  tableNumber?: string;
  paymentMethod: "cod" | "upi" | "card";
  notes?: string;
}
