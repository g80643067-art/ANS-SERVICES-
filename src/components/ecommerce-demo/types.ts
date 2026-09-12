export type ProductCategory = 'all' | 'groceries' | 'fashion' | 'digital' | 'electronics' | 'home';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  description: string;
  specs: { [key: string]: string };
  sizes?: string[];
  colors?: string[];
  has3DModel?: boolean;
  isFastDelivery?: boolean; // 10-30 min delivery
  isTrending?: boolean;
  isBestDeal?: boolean;
  isNewArrival?: boolean;
  brand: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  orderId: string;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: 'upi' | 'cod';
  address: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    pincode: string;
  };
  orderDate: string;
  estimatedDelivery: string;
  status: 'Order Placed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
}
