export interface BridalService {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  duration: string;
  price: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface BridalPackage {
  id: string;
  name: string;
  tagline: string;
  price: string;
  originalPrice?: string;
  isPopular?: boolean;
  duration: string;
  features: string[];
  idealFor: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "bridal" | "engagement" | "reception" | "hair" | "airbrush";
  categoryLabel: string;
  image: string;
  caption: string;
}

export interface Testimonial {
  id: string;
  brideName: string;
  groomName?: string;
  event: string;
  date: string;
  image: string;
  rating: number;
  review: string;
  lookTitle: string;
}

export const BRIDAL_SERVICES: BridalService[] = [
  {
    id: "bridal-makeup",
    title: "Signature Bridal Makeup",
    subtitle: "Timeless Royal Radiance",
    category: "Bridal",
    duration: "2.5 - 3 Hours",
    price: "$350 / ₹22,000",
    description: "Couture bridal makeup crafted with skin-prep rituals, seamless high-definition blending, and waterproof longevity designed for high-intensity camera lighting and tears of joy.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop",
    highlights: ["HD flawless camera-ready base", "Waterproof & sweat-resistant", "Custom eye art with faux mink lashes", "Hydrating 24K gold skin priming"],
  },
  {
    id: "engagement-makeup",
    title: "Engagement & Sagan Glam",
    subtitle: "Dewy, Fresh & Romantic",
    category: "Pre-Wedding",
    duration: "2 Hours",
    price: "$250 / ₹16,000",
    description: "Soft romantic glam focusing on glass-skin radiance, soft pastel or rose-gold lids, flushed cheeks, and a fresh youthful glow that complements your engagement ensemble.",
    image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?q=80&w=900&auto=format&fit=crop",
    highlights: ["Glass-skin glow finish", "Soft shimmery halo eye makeup", "Feather-light airbrush contouring", "Long-stay luxury lip shade"],
  },
  {
    id: "reception-makeup",
    title: "Reception & Cocktail Radiance",
    subtitle: "Red Carpet Elegance",
    category: "Reception",
    duration: "2 Hours",
    price: "$300 / ₹18,000",
    description: "High-impact evening elegance featuring sculpted cheekbones, sultry smokey eyes or glitter pigments, bold lips, and luminous radiance tailored for dramatic ballroom spotlights.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=900&auto=format&fit=crop",
    highlights: ["High-definition sculpted contour", "Smokey eyes with metallic pigments", "16-hour sweat-proof matte or satin finish", "Setting spray lock-in system"],
  },
  {
    id: "hair-styling",
    title: "Couture Bridal Hair Styling",
    subtitle: "Bespoke Buns, Braids & Waves",
    category: "Hair",
    duration: "1.5 Hours",
    price: "$180 / ₹12,000",
    description: "Intricate floral bridal buns, traditional South Indian veni braids, textured Hollywood waves, and secure bridal tiara or maang tikka installation with zero flyaways.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=900&auto=format&fit=crop",
    highlights: ["Thermal protection & texture hold", "Fresh flower & hair accessory setting", "Maang tikka / Matha patti placement", "Volume boost & extension integration"],
  },
  {
    id: "draping",
    title: "Luxury Saree & Lehenga Draping",
    subtitle: "Precision Pleating & Secure Pinning",
    category: "Draping",
    duration: "45 Mins",
    price: "$90 / ₹6,000",
    description: "Expert pleating for Kanjeevarams, Banarasis, and designer lehengas with single or double dupatta pinning that stays immaculate throughout dance and rituals.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=900&auto=format&fit=crop",
    highlights: ["Knife-edge precision pleats", "Secure painless pinning technique", "Double dupatta veil balance", "Comfortable mobility throughout rituals"],
  },
  {
    id: "hd-airbrush",
    title: "Ultra HD & Airbrush Artistry",
    subtitle: "Micro-Fine Featherweight Perfection",
    category: "Airbrush",
    duration: "2.5 Hours",
    price: "$400 / ₹26,000",
    description: "The gold standard in bridal makeup. Atomized micro-pigments create a lightweight, second-skin finish that blurs pores, resists humidity, and looks flawless in 4K photography.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=900&auto=format&fit=crop",
    highlights: ["Temptu Pro Airbrush system", "Pore-blurring velvet finish", "Transfer-proof 18-hour hold", "Zero cakey or heavy feeling"],
  },
];

export const BRIDAL_PACKAGES: BridalPackage[] = [
  {
    id: "classic-bridal",
    name: "Classic Bridal Elegance",
    tagline: "Essential luxury for the timeless bride",
    price: "$450 / ₹28,000",
    originalPrice: "$550 / ₹35,000",
    duration: "Half Day Experience",
    idealFor: "Intimate weddings & traditional ceremonies",
    features: [
      "HD Flawless Bridal Makeup",
      "Traditional or Modern Hair Styling",
      "Saree / Single Lehenga Draping",
      "Premium False Mink Lashes & Lenses",
      "Hydrating Gold Skin Prep Mask",
      "Jewelry & Hair Accessory Setting",
      "Touch-up Lip Kit for Reception",
    ],
  },
  {
    id: "premium-bridal",
    name: "Signature Premium Bridal",
    tagline: "Our most requested all-inclusive bridal transformation",
    price: "$750 / ₹48,000",
    originalPrice: "$950 / ₹62,000",
    isPopular: true,
    duration: "Full Day Experience",
    idealFor: "Grand weddings & multi-event celebrations",
    features: [
      "Choice of Ultra HD or Pro Airbrush Base",
      "Intricate Couture Floral Hair Styling",
      "Dual Dupatta Draping & Silhouette Styling",
      "Custom 3D Silk Lashes & Eye Detailing",
      "Pre-Wedding Consultation & Digital Moodboard",
      "Complimentary Mother / Sister Glam Touch-up",
      "Luxury 24K Gold Collagen Eye & Lip Prep",
      "Deluxe On-Day Touch-up Kit Included",
    ],
  },
  {
    id: "royal-bridal",
    name: "Royal Couture Empress",
    tagline: "Unrivaled haute couture artistry by Master Senior Artists",
    price: "$1,200 / ₹75,000",
    originalPrice: "$1,500 / ₹95,000",
    duration: "VIP Full Day & Evening",
    idealFor: "Destination weddings & royal luxury ceremonies",
    features: [
      "Master Senior Artist Exclusive Booking",
      "Signature Airbrush Micro-Finish for Muhurtham & Reception",
      "Two Complete Hair & Makeup Transformations (Day + Evening)",
      "Full Pre-Wedding In-Salon Trial Session Included",
      "Hair Extension Blending & Fresh Exotic Florals",
      "Body Shimmer, Neck & Back Radiance Blending",
      "Dedicated Touch-up Artist for Stage & Photo Shoots",
      "On-Venue VIP Service & Unlimited Retouches",
    ],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g-1",
    title: "Royal Crimson & Gold Bride",
    category: "bridal",
    categoryLabel: "Royal Bridal",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop",
    caption: "Traditional temple jewelry with radiant HD base and gold-leaf eye accent.",
  },
  {
    id: "g-2",
    title: "Champagne Glow Engagement",
    category: "engagement",
    categoryLabel: "Engagement Glam",
    image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?q=80&w=900&auto=format&fit=crop",
    caption: "Soft dewy glow with rose-tinted gloss and romantic loose waves.",
  },
  {
    id: "g-3",
    title: "Ballroom Starlight Reception",
    category: "reception",
    categoryLabel: "Reception Radiance",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=900&auto=format&fit=crop",
    caption: "Dramatic smoked wing, sculpted jawline, and Hollywood textured curls.",
  },
  {
    id: "g-4",
    title: "Floral Braid & Kundan Matha Patti",
    category: "hair",
    categoryLabel: "Hair & Draping",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=900&auto=format&fit=crop",
    caption: "Intricate jasmine and baby's breath floral braiding with secure kundan jewel setting.",
  },
  {
    id: "g-5",
    title: "Airbrush Micro-Finish Perfection",
    category: "airbrush",
    categoryLabel: "HD Airbrush",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=900&auto=format&fit=crop",
    caption: "Velvety second-skin airbrush application under direct 4K studio lighting.",
  },
  {
    id: "g-6",
    title: "Pastel Pink Dream Bride",
    category: "bridal",
    categoryLabel: "Royal Bridal",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop",
    caption: "Soft blush undertones, delicate shimmer lids, and natural feathered brows.",
  },
  {
    id: "g-7",
    title: "Cocktail Sunset Glam",
    category: "engagement",
    categoryLabel: "Engagement Glam",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=900&auto=format&fit=crop",
    caption: "Sun-kissed bronze cheekbones with nude velvet lips and sleek half-updo.",
  },
  {
    id: "g-8",
    title: "South Indian Kanjeevaram Draping",
    category: "hair",
    categoryLabel: "Hair & Draping",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=900&auto=format&fit=crop",
    caption: "Gold zari border precision pleats with traditional waist belt positioning.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    brideName: "Ananya Sharma",
    groomName: "Rohan",
    event: "Grand Palace Wedding, Udaipur",
    date: "November 2025",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    rating: 5,
    lookTitle: "Royal Heritage Bridal",
    review: "Beauty Demo exceeded every single expectation I had for my wedding day. The makeup felt weightless despite lasting through 8 hours of rituals, heavy lights, and tears. Everyone kept complimenting how radiant my skin looked!",
  },
  {
    id: "t-2",
    brideName: "Meera Patel",
    groomName: "Sameer",
    event: "Beachside Destination Wedding, Goa",
    date: "January 2026",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
    rating: 5,
    lookTitle: "Airbrush Coastal Glow",
    review: "I was terrified that the coastal humidity would ruin my makeup, but the Airbrush Bridal package held up flawlessly. The hair styling stayed intact even in the sea breeze. Truly master artists.",
  },
  {
    id: "t-3",
    brideName: "Priyanka Kapoor",
    groomName: "Aditya",
    event: "JW Marriott Ballroom, Mumbai",
    date: "February 2026",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop",
    rating: 5,
    lookTitle: "Signature Reception Glam",
    review: "The trial session before the wedding gave me total peace of mind. On the big day, the team was calm, punctual, and transformed me into the bride of my dreams. Cannot recommend them enough!",
  },
];

export const SALON_STATS = [
  { value: "500+", label: "Happy Brides Styled", subtext: "Across 12+ cities" },
  { value: "100%", label: "Luxury Brand Products", subtext: "Dior, MAC & Charlotte Tilbury" },
  { value: "18 Hrs", label: "Sweat-Proof Longevity", subtext: "4K Camera-Tested" },
  { value: "4.98★", label: "Client Satisfaction", subtext: "From 450+ verified reviews" },
];
