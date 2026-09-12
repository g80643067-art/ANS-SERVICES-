import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  // --- ELECTRONICS ---
  {
    id: 'el-1',
    name: 'ANX Pro Ultra 5G Smartphone (256GB, Titanium Black)',
    category: 'electronics',
    subcategory: 'Smartphones',
    price: 64999,
    originalPrice: 79999,
    discount: 19,
    rating: 4.8,
    reviewsCount: 1420,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Flagship 5G smartphone with 120Hz AMOLED display, Snapdragon 8 Gen 3 processor, 108MP triple camera system, and 5000mAh battery with 120W fast charging.',
    specs: {
      'Processor': 'Snapdragon 8 Gen 3',
      'Display': '6.8 inch 120Hz AMOLED',
      'Camera': '108MP + 50MP + 12MP',
      'Battery': '5000 mAh (120W Fast Charge)',
      'OS': 'ANX OS 14 (Android 14)'
    },
    colors: ['Titanium Black', 'Silver Frost', 'Deep Purple'],
    has3DModel: true,
    isTrending: true,
    isBestDeal: true,
    brand: 'ANX Tech'
  },
  {
    id: 'el-2',
    name: 'ApexBook Pro 16" Laptop (M3 Ultra, 32GB RAM, 1TB SSD)',
    category: 'electronics',
    subcategory: 'Laptops',
    price: 149999,
    originalPrice: 169999,
    discount: 12,
    rating: 4.9,
    reviewsCount: 850,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'High-performance professional laptop designed for creators, developers, and power users. Features stunning Retina display and 22-hour battery life.',
    specs: {
      'Processor': 'M3 Ultra 16-Core',
      'Memory': '32GB Unified RAM',
      'Storage': '1TB NVMe SSD',
      'Display': '16.2" Liquid Retina XDR'
    },
    colors: ['Space Gray', 'Silver'],
    has3DModel: true,
    isTrending: true,
    brand: 'Apex'
  },
  {
    id: 'el-3',
    name: 'SonicWave Active Noise Cancelling Wireless Headphones',
    category: 'electronics',
    subcategory: 'Headphones',
    price: 12999,
    originalPrice: 19999,
    discount: 35,
    rating: 4.7,
    reviewsCount: 2310,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Immersive sound quality with industry-leading hybrid ANC, plush memory foam ear cushions, and 40 hours of continuous playback.',
    specs: {
      'Driver': '40mm Neodymium',
      'Connectivity': 'Bluetooth 5.3 + Aux',
      'Battery Life': '40 Hours with ANC On'
    },
    colors: ['Midnight Black', 'Pearl White', 'Rose Gold'],
    has3DModel: true,
    isBestDeal: true,
    brand: 'SonicWave'
  },
  {
    id: 'el-4',
    name: 'PulseFit Smartwatch Series 9 (AMOLED, GPS, Health Monitor)',
    category: 'electronics',
    subcategory: 'Smartwatches',
    price: 4999,
    originalPrice: 8999,
    discount: 44,
    rating: 4.6,
    reviewsCount: 940,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Advanced health tracking, ECG, blood oxygen monitoring, 100+ sports modes, and waterproof aluminum alloy body.',
    specs: {
      'Display': '1.43" AMOLED Always-On',
      'Water Resistance': '5ATM (50m)',
      'Battery': '7 Days normal use'
    },
    colors: ['Obsidian', 'Forest Green', 'Navy Blue'],
    has3DModel: false,
    isNewArrival: true,
    brand: 'PulseFit'
  },

  // --- FASHION / CLOTHES ---
  {
    id: 'cl-1',
    name: 'Urban Streetwear Oversized Graphic Hoodie',
    category: 'fashion',
    subcategory: 'Hoodies',
    price: 1899,
    originalPrice: 3499,
    discount: 45,
    rating: 4.7,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Premium heavyweight 350 GSM cotton fleece hoodie with minimalist chest embroidery and relaxed drop-shoulder streetwear fit.',
    specs: {
      'Material': '100% Super-Combed Cotton Fleece',
      'Fit': 'Oversized / Relaxed',
      'Care': 'Machine wash cold'
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Jet Black', 'Off White', 'Sage Green'],
    has3DModel: true,
    isTrending: true,
    brand: 'NovaWear'
  },
  {
    id: 'cl-2',
    name: 'Classic Minimalist Crewneck Cotton T-Shirt',
    category: 'fashion',
    subcategory: 'T-Shirts',
    price: 699,
    originalPrice: 1299,
    discount: 46,
    rating: 4.8,
    reviewsCount: 3100,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Ultra-soft breathable combed cotton daily essential t-shirt with tailored ribbed collar and zero-shrink pre-wash treatment.',
    specs: {
      'Fabric': '100% Bio-Wash Cotton',
      'GSM': '180 GSM'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Pure White', 'Charcoal', 'Navy', 'Olive'],
    has3DModel: false,
    isBestDeal: true,
    brand: 'NovaWear'
  },
  {
    id: 'cl-3',
    name: 'Heritage Slim-Fit Indigo Denim Jeans',
    category: 'fashion',
    subcategory: 'Jeans',
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    rating: 4.5,
    reviewsCount: 780,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Stretch denim engineered for effortless all-day comfort with classic 5-pocket styling and vintage stone wash fade.',
    specs: {
      'Material': '98% Cotton, 2% Elastane',
      'Rise': 'Mid-Rise Slim'
    },
    sizes: ['30', '32', '34', '36'],
    colors: ['Dark Indigo', 'Light Wash', 'Washed Black'],
    has3DModel: false,
    isNewArrival: true,
    brand: 'DenimCo'
  },
  {
    id: 'cl-4',
    name: 'Festive Designer Silk Blend Kurta Set',
    category: 'fashion',
    subcategory: 'Kurtas',
    price: 2999,
    originalPrice: 5999,
    discount: 50,
    rating: 4.7,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Elegant royal silk-blend straight kurta paired with comfortable churidar pants, featuring subtle mandarin collar and thread embroidery.',
    specs: {
      'Fabric': 'Art Silk Blend',
      'Includes': 'Kurta & Pyjama'
    },
    sizes: ['38', '40', '42', '44'],
    colors: ['Royal Blue', 'Maroon', 'Emerald Green'],
    has3DModel: false,
    brand: 'EthnicVogue'
  },

  // --- DIGITAL PRODUCTS ---
  {
    id: 'dg-1',
    name: 'SaaSify Pro — Next.js & Tailwind SaaS Boilerplate UI Kit',
    category: 'digital',
    subcategory: 'Website Templates',
    price: 2999,
    originalPrice: 7999,
    discount: 62,
    rating: 4.9,
    reviewsCount: 610,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Production-ready full-stack SaaS starter kit with authentication, Stripe billing, database integration, dark mode, and SEO landing page components.',
    specs: {
      'Tech Stack': 'Next.js 14, TypeScript, Tailwind CSS, Prisma',
      'License': 'Lifetime Commercial License',
      'Delivery': 'Instant GitHub Repo Access'
    },
    has3DModel: false,
    isTrending: true,
    isBestDeal: true,
    brand: 'ANX Digital'
  },
  {
    id: 'dg-2',
    name: 'Nexus UI — 500+ Figma Components & Design System Kit',
    category: 'digital',
    subcategory: 'UI Kits',
    price: 1999,
    originalPrice: 4999,
    discount: 60,
    rating: 4.8,
    reviewsCount: 430,
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Comprehensive design system for Figma with auto-layout v5, dark/light modes, variable tokens, and accessible component variants.',
    specs: {
      'Software': 'Figma (Latest Version)',
      'Components': '500+ Atomic Components',
      'Delivery': 'Figma Community File Access'
    },
    has3DModel: false,
    brand: 'NexusDesign'
  },
  {
    id: 'dg-3',
    name: 'The Modern UI/UX Masterclass E-Book & Video Course',
    category: 'digital',
    subcategory: 'E-books',
    price: 999,
    originalPrice: 2999,
    discount: 66,
    rating: 4.9,
    reviewsCount: 1120,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop'
    ],
    description: '350-page comprehensive guide to mastering digital product design, conversion rate optimization, typography, and color theory.',
    specs: {
      'Format': 'PDF + EPUB + 12 Hours Video',
      'Pages': '350+ Illustrated Pages'
    },
    has3DModel: false,
    isNewArrival: true,
    brand: 'DesignMaster'
  },

  // --- GROCERIES (10-30 Min Delivery) ---
  {
    id: 'gr-1',
    name: 'Fresh Organic Alphonso Mangoes (Box of 6, Export Grade)',
    category: 'groceries',
    subcategory: 'Fruits & Vegetables',
    price: 699,
    originalPrice: 999,
    discount: 30,
    rating: 4.8,
    reviewsCount: 890,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Directly sourced juicy, sweet, naturally ripened Devgad Alphonso mangoes delivered fresh to your doorstep in 15 minutes.',
    specs: {
      'Weight': 'Approx 2 Kg (6 pieces)',
      'Delivery': '10-30 Min Express Delivery',
      'Quality': '100% Chemically Untreated'
    },
    has3DModel: false,
    isFastDelivery: true,
    isTrending: true,
    brand: 'FarmFresh'
  },
  {
    id: 'gr-2',
    name: 'Amul Pure Desi Cow Ghee (1 Litre Jar)',
    category: 'groceries',
    subcategory: 'Dairy',
    price: 649,
    originalPrice: 699,
    discount: 7,
    rating: 4.9,
    reviewsCount: 4500,
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Rich aroma, granular texture, and pure traditional taste. Made from quality cream with rich nutritional goodness.',
    specs: {
      'Quantity': '1 Litre',
      'Delivery': '10-30 Min Express Delivery'
    },
    has3DModel: false,
    isFastDelivery: true,
    isBestDeal: true,
    brand: 'Amul'
  },
  {
    id: 'gr-3',
    name: 'Lays Magic Masala Potato Chips (Party Pack, 150g)',
    category: 'groceries',
    subcategory: 'Snacks',
    price: 48,
    originalPrice: 50,
    discount: 4,
    rating: 4.7,
    reviewsCount: 1890,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Crispy potato chips dusted with irresistible magical Indian spices. Perfect movie snack.',
    specs: {
      'Weight': '150g',
      'Delivery': '10-30 Min Express Delivery'
    },
    has3DModel: false,
    isFastDelivery: true,
    brand: 'Lays'
  },
  {
    id: 'gr-4',
    name: 'Organic Premium Robusta Coffee Beans (250g)',
    category: 'groceries',
    subcategory: 'Beverages',
    price: 449,
    originalPrice: 799,
    discount: 43,
    rating: 4.8,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Single-origin dark roast coffee beans with notes of chocolate and roasted hazelnut. Freshly roasted and packaged.',
    specs: {
      'Weight': '250g',
      'Roast': 'Dark Roast'
    },
    has3DModel: false,
    isFastDelivery: true,
    brand: 'BaristaBlend'
  }
];
