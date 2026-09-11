import { BakeryProduct, ProductCategory } from "./types";

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  count: number;
  image: string;
  description: string;
}

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: "cakes",
    name: "Cakes",
    count: 14,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
    description: "Celebration, layered & custom gourmet cakes",
  },
  {
    id: "pastries",
    name: "Pastries",
    count: 12,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop",
    description: "Flaky French viennoiserie & golden butter layers",
  },
  {
    id: "breads",
    name: "Breads",
    count: 10,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
    description: "48-hr slow fermented sourdough & artisan loaves",
  },
  {
    id: "cookies",
    name: "Cookies",
    count: 9,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800&auto=format&fit=crop",
    description: "Crisp butter cookies, macarons & loaded chocolate chips",
  },
  {
    id: "donuts",
    name: "Donuts",
    count: 8,
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=800&auto=format&fit=crop",
    description: "Brioche ring donuts, chocolate truffle & filled delights",
  },
  {
    id: "cupcakes",
    name: "Cupcakes",
    count: 11,
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=800&auto=format&fit=crop",
    description: "Fluffy sponge with whipped Swiss buttercream swirls",
  },
  {
    id: "desserts",
    name: "Desserts",
    count: 9,
    image: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?q=80&w=800&auto=format&fit=crop",
    description: "Tiramisu, cheesecakes, panna cotta & tarts",
  },
  {
    id: "beverages",
    name: "Beverages",
    count: 7,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
    description: "Espresso brews, spiced chai & handcrafted hot cocoa",
  },
];

export const BAKERY_PRODUCTS: BakeryProduct[] = [
  // 1. Chocolate Truffle Cake (Best Seller)
  {
    id: "choc-truffle-cake",
    name: "Chocolate Truffle Cake",
    category: "cakes",
    price: 38.0,
    originalPrice: 45.0,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Silky 70% dark Belgian chocolate ganache layered with moist sponge and dusted with cocoa nibs.",
    description: "Our signature dessert. Three layers of decadent Belgian chocolate sponge soaked in house vanilla bean syrup, enveloped in a luscious velvet chocolate truffle ganache and topped with hand-rolled truffles and edible gold flakes.",
    tags: ["Best Seller", "Eggless Available", "Chef Special"],
    isBestSeller: true,
    sizes: ["0.5 kg (Serves 4-6)", "1 kg (Serves 8-12)", "2 kg (Serves 16-20)"],
    dietary: ["100% Butter", "Eggless"],
    ingredients: ["Belgian Dark Chocolate 70%", "Organic Flour", "Normandy Dairy Cream", "Madagascar Vanilla Bean", "Cocoa Powder"],
    prepTime: "Freshly baked every morning",
    reviews: [
      {
        id: "r1",
        author: "Camille Laurent",
        rating: 5,
        date: "2 days ago",
        comment: "The richest chocolate cake I have ever tasted! Rich yet not overly sweet. Perfect birthday centerpiece.",
        verified: true,
      },
      {
        id: "r2",
        author: "Marcus Chen",
        rating: 5,
        date: "1 week ago",
        comment: "Ordered this for our anniversary. The ganache texture is absolutely silken. Will order again!",
        verified: true,
      },
    ],
  },

  // 2. Red Velvet Cake (Best Seller)
  {
    id: "red-velvet-cake",
    name: "Red Velvet Cake",
    category: "cakes",
    price: 36.0,
    originalPrice: 42.0,
    discountPercent: 14,
    rating: 4.8,
    reviewsCount: 98,
    image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Classic ruby cocoa sponge paired with tangy Philadelphia cream cheese frosting and red velvet crumb.",
    description: "An authentic American classic perfected in our bakehouse. Vibrant crimson sponge with subtle hints of buttermilk and premium cocoa, generously frosted with silky whipped cream cheese frosting and finished with delicate cake crumbles.",
    tags: ["Best Seller", "Signature", "Popular Choice"],
    isBestSeller: true,
    sizes: ["0.5 kg (Serves 4-6)", "1 kg (Serves 8-12)", "2 kg (Serves 16-20)"],
    dietary: ["100% Butter"],
    ingredients: ["Cultured Buttermilk", "Philadelphia Cream Cheese", "Dutch Cocoa", "Madagascar Vanilla", "Pure Cane Sugar"],
    prepTime: "Fresh daily",
    reviews: [
      {
        id: "r3",
        author: "Elena Rostov",
        rating: 5,
        date: "3 days ago",
        comment: "The cream cheese frosting balance is heavenly! Not greasy at all, light as a cloud.",
        verified: true,
      },
    ],
  },

  // 3. Fresh Croissant (Best Seller)
  {
    id: "fresh-croissant",
    name: "Fresh Croissant",
    category: "pastries",
    price: 4.5,
    originalPrice: 5.5,
    rating: 4.9,
    reviewsCount: 230,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Golden, multi-layered French croissant made with 100% Normandy butter, crispy outside and soft honeycomb inside.",
    description: "Prepared with traditional 72-hour laminated French technique using AOP Normandy butter. Baked every morning at 5:00 AM to achieve an ultra-crispy honeycomb interior and resonant crunch with every bite.",
    tags: ["Best Seller", "Fresh at 5 AM", "AOP Butter"],
    isBestSeller: true,
    sizes: ["Single Piece", "Pack of 4 (Save 15%)", "Pack of 8 (Save 25%)"],
    dietary: ["100% Butter", "Artisanal"],
    ingredients: ["French Type 55 Flour", "Normandy AOP Butter (84% butterfat)", "Sea Salt", "Fresh Yeast"],
    prepTime: "Baked fresh hourly until noon",
    reviews: [
      {
        id: "r4",
        author: "Julian Vance",
        rating: 5,
        date: "Yesterday",
        comment: "Authentic Parisian quality. You hear the crunch from across the table. Absolutely marvelous.",
        verified: true,
      },
    ],
  },

  // 4. Chocolate Donut (Best Seller)
  {
    id: "chocolate-donut",
    name: "Chocolate Donut",
    category: "donuts",
    price: 3.75,
    originalPrice: 4.5,
    rating: 4.8,
    reviewsCount: 115,
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Fluffy artisan brioche donut dipped in thick dark chocolate glaze and garnished with chocolate curls.",
    description: "Slow-risen brioche dough fried to a golden cloud-like fluffiness, submerged in melted 64% Valrhona dark chocolate glaze and finished with delicate dark chocolate shavings.",
    tags: ["Best Seller", "Kids Favorite", "Brioche Dough"],
    isBestSeller: true,
    sizes: ["Single Donut", "Box of 4 Assorted", "Box of 6 Party Pack"],
    dietary: ["100% Butter", "Artisanal"],
    ingredients: ["Brioche Dough", "Valrhona Dark Chocolate", "Fresh Milk", "Brown Cane Sugar"],
    prepTime: "Baked and glazed fresh daily",
    reviews: [
      {
        id: "r5",
        author: "Sophie Miller",
        rating: 5,
        date: "4 days ago",
        comment: "So soft! The chocolate glaze is pure melted dark chocolate, not sugary icing.",
        verified: true,
      },
    ],
  },

  // 5. Butter Cookies (Best Seller)
  {
    id: "butter-cookies",
    name: "Butter Cookies",
    category: "cookies",
    price: 14.0,
    originalPrice: 18.0,
    rating: 4.9,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Melt-in-your-mouth Danish style butter cookies piped into golden rosettes with a touch of sea salt.",
    description: "A heritage recipe made with cultured churned butter, unbleached flour, and raw bourbon vanilla bean. Baked until just golden on the edges, delivering a melt-in-your-mouth texture that pairs ideally with warm tea or espresso.",
    tags: ["Best Seller", "Gift Tin Available", "Traditional Recipe"],
    isBestSeller: true,
    sizes: ["Box of 250g", "Luxury Tin 500g", "Family Box 1kg"],
    dietary: ["100% Butter", "Eggless"],
    ingredients: ["Churned Cultured Butter", "Wheat Flour", "Bourbon Vanilla", "Sea Salt Flakes"],
    prepTime: "Freshly packed in airtight tins",
    reviews: [
      {
        id: "r6",
        author: "Nora Lindqvist",
        rating: 5,
        date: "5 days ago",
        comment: "Brings back memories of Danish butter cookies, but 10 times fresher and more buttery!",
        verified: true,
      },
    ],
  },

  // 6. Blueberry Cheesecake (Best Seller)
  {
    id: "blueberry-cheesecake",
    name: "Blueberry Cheesecake",
    category: "desserts",
    price: 34.0,
    originalPrice: 40.0,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 167,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Baked New York style cream cheesecake over buttery graham crust, topped with homemade wild blueberry compote.",
    description: "Dense, creamy, and velvety baked cheesecake crafted with pure cream cheese, sour cream, and real vanilla bean on an artisan graham biscuit butter crust. Crowned with a tart, vibrant compote made from wild Maine blueberries.",
    tags: ["Best Seller", "Customer Favorite", "NY Style"],
    isBestSeller: true,
    sizes: ["Individual Slice", "0.5 kg (Serves 4-6)", "1 kg (Serves 8-10)"],
    dietary: ["100% Butter", "Eggless Available"],
    ingredients: ["Philadelphia Cream Cheese", "Wild Blueberries", "Graham Crust", "Fresh Lemon Zest", "Sour Cream"],
    prepTime: "Chilled for 24 hours to perfection",
    reviews: [
      {
        id: "r7",
        author: "David K.",
        rating: 5,
        date: "1 week ago",
        comment: "The blueberry compote is not too sweet, perfect tartness. Crust is deeply buttery.",
        verified: true,
      },
    ],
  },

  // 7. Classic Cupcakes (Best Seller)
  {
    id: "classic-cupcakes",
    name: "Classic Cupcakes",
    category: "cupcakes",
    price: 18.0,
    originalPrice: 22.0,
    rating: 4.8,
    reviewsCount: 104,
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Assorted box of vanilla bean, chocolate ganache, and strawberry swirl cupcakes with whipped Swiss buttercream.",
    description: "Fluffy, tender sponge cupcakes topped with our signature whipped Swiss meringue buttercream that is light, silky, and never cloying. Hand-decorated with natural fruit pearls, gold dust, and edible blossoms.",
    tags: ["Best Seller", "Party Favorite", "Assorted Flavors"],
    isBestSeller: true,
    sizes: ["Box of 4", "Box of 6 (Popular)", "Party Box of 12"],
    dietary: ["100% Butter", "Eggless Available"],
    ingredients: ["Organic Flour", "Swiss Buttercream", "Vanilla Pods", "Natural Fruit Purees"],
    prepTime: "Decorated fresh every morning",
    reviews: [
      {
        id: "r8",
        author: "Hannah Wright",
        rating: 5,
        date: "3 days ago",
        comment: "Best cupcakes in the city. The buttercream literally melts into silk. Loved the strawberry swirl!",
        verified: true,
      },
    ],
  },

  // 8. Garlic Bread (Best Seller)
  {
    id: "garlic-bread",
    name: "Garlic Bread",
    category: "breads",
    price: 6.5,
    originalPrice: 8.0,
    rating: 4.9,
    reviewsCount: 178,
    image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Crusty artisan sourdough baguette infused with roasted garlic confit butter, fresh rosemary, and melted mozzarella.",
    description: "Our rustic French baguette sliced and generously layered with slow-roasted garlic confit butter, fresh garden parsley, sea salt, and a blanket of toasted mozzarella cheese. Crispy on top with a warm garlicky center.",
    tags: ["Best Seller", "Warm & Savory", "Oven Warm"],
    isBestSeller: true,
    sizes: ["Regular Loaf (Serves 2)", "Large Feast Loaf (Serves 4)"],
    dietary: ["100% Butter", "Vegetarian"],
    ingredients: ["Artisan Baguette", "Roasted Garlic Confit", "Parsley & Thyme", "Normandy Butter", "Mozzarella"],
    prepTime: "Toasted fresh to order",
    reviews: [
      {
        id: "r9",
        author: "Anthony Russo",
        rating: 5,
        date: "2 days ago",
        comment: "The roasted garlic aroma fills your kitchen! Perfect crunch with gooey cheese.",
        verified: true,
      },
    ],
  },

  // Additional Rich Menu Items
  // 9. Sourdough Boule (Breads)
  {
    id: "rustic-sourdough-boule",
    name: "Rustic Sourdough Boule",
    category: "breads",
    price: 8.5,
    rating: 5.0,
    reviewsCount: 210,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Naturally leavened sourdough with a blistered mahogany crust and open, chewy interior with gentle tang.",
    description: "Created using our 12-year-old mother starter 'Eve'. Crafted with 100% organic stoneground flour, pure filtered water, and sea salt. Naturally leavened over 48 hours for superior digestion and unmatched depth of flavor.",
    tags: ["Artisan Loaf", "Vegan", "Wild Yeast"],
    sizes: ["Whole Boule (850g)", "Sliced"],
    dietary: ["Vegan", "Artisanal"],
    ingredients: ["Organic Stoneground Wheat", "Rye Starter", "Filtered Water", "Atlantic Sea Salt"],
    prepTime: "48-hour slow fermented",
    reviews: [],
  },

  // 10. Almond Croissant (Pastries)
  {
    id: "almond-croissant",
    name: "Almond Croissant",
    category: "pastries",
    price: 5.75,
    originalPrice: 6.5,
    rating: 4.9,
    reviewsCount: 92,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Twice-baked butter croissant filled with fragrant almond frangipane and coated in toasted sliced almonds.",
    description: "Our signature French croissant dipped in light orange blossom syrup, packed with rich almond cream, and baked a second time until caramelized and topped with powdered sugar.",
    tags: ["Chef Recommendation", "French Classic"],
    sizes: ["Single Pastry", "Pack of 3"],
    dietary: ["100% Butter", "Artisanal"],
    reviews: [],
  },

  // 11. French Macaron Box (Cookies)
  {
    id: "macaron-box-6",
    name: "French Macaron Box (6 pcs)",
    category: "cookies",
    price: 16.5,
    rating: 4.8,
    reviewsCount: 75,
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Delicate almond meringue shells filled with chocolate ganache, salted caramel, pistachio, and raspberry.",
    description: "Handmade Parisian macarons with egg-shell crisp crusts and chewy centers. Flavors include Pistachio Sicilian, Salted Butter Caramel, Valrhona Dark Chocolate, Tahitian Vanilla, Raspberry Rose, and Espresso.",
    tags: ["Gluten-Free", "Luxury Gift"],
    sizes: ["Box of 6", "Box of 12 (Luxury Gift)", "Party Box of 24"],
    dietary: ["Gluten-Free"],
    reviews: [],
  },

  // 12. Boston Cream Donut (Donuts)
  {
    id: "boston-cream-donut",
    name: "Boston Cream Donut",
    category: "donuts",
    price: 4.25,
    rating: 4.7,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Golden pillow donut stuffed with vanilla bean custard and dipped in warm dark chocolate glaze.",
    description: "Tender yeasted pillow donut overflowing with chilled handmade vanilla bean pastry cream, sealed with a glossy layer of dark chocolate fudge.",
    tags: ["Custard Filled", "Fresh Daily"],
    sizes: ["Single Donut", "Pack of 3"],
    dietary: ["100% Butter"],
    reviews: [],
  },

  // 13. Pistachio Raspberry Tart (Desserts)
  {
    id: "pistachio-raspberry-tart",
    name: "Pistachio Raspberry Tart",
    category: "desserts",
    price: 7.5,
    rating: 4.9,
    reviewsCount: 58,
    image: "https://images.unsplash.com/photo-1519915028121-7d346b420b13?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Crisp sable tart shell with baked pistachio frangipane, ruby raspberry jelly, and fresh raspberries.",
    description: "Sweet almond pastry crust layered with roasted Bronte pistachio ganache, fresh raspberry coulis, and hand-placed wild raspberries dusted with powdered sugar.",
    tags: ["Gourmet Patisserie", "Seasonal Fruit"],
    sizes: ["Individual Tart", "Large Tart (Serves 6)"],
    dietary: ["100% Butter", "Artisanal"],
    reviews: [],
  },

  // 14. Artisanal Hot Cocoa (Beverages)
  {
    id: "artisanal-hot-cocoa",
    name: "Artisanal Hot Cocoa",
    category: "beverages",
    price: 5.5,
    rating: 4.9,
    reviewsCount: 110,
    image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Melted 70% dark Belgian chocolate whisked with whole milk, vanilla, and torched marshmallow.",
    description: "Not a powder mix. Pure Belgian chocolate couverture melted directly into steamed whole organic milk, topped with a giant house-made torched vanilla bean marshmallow.",
    tags: ["House Favorite", "Warm Drink"],
    sizes: ["Regular 12 oz", "Large 16 oz"],
    dietary: ["100% Butter"],
    reviews: [],
  },

  // 15. Iced Vanilla Caramel Macchiato (Beverages)
  {
    id: "iced-caramel-macchiato",
    name: "Iced Vanilla Caramel Macchiato",
    category: "beverages",
    price: 6.0,
    rating: 4.8,
    reviewsCount: 95,
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Freshly pulled double espresso over cold milk and vanilla bean syrup, drizzled with burnt caramel.",
    description: "Specialty Ethiopian espresso pulled fresh, layered over whole milk and Madagascar vanilla syrup on ice, topped with our house-simmered sea salt caramel drizzle.",
    tags: ["Cold Beverage", "Specialty Coffee"],
    sizes: ["16 oz Iced", "20 oz Iced"],
    dietary: ["Vegetarian"],
    reviews: [],
  },
];

export interface SpecialOfferItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  discount: string;
  code: string;
  image: string;
  items: string[];
}

export const SPECIAL_OFFERS: SpecialOfferItem[] = [
  {
    id: "morning-box",
    badge: "MORNING SPECIAL",
    title: "Morning Baker's Feast",
    subtitle: "2 Butter Croissants, 2 Pain au Chocolat, 2 Sourdough Bagels & Choice of Hot Cocoa or Latte.",
    price: "$19.99",
    originalPrice: "$32.00",
    discount: "38% OFF",
    code: "MORNING38",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
    items: ["2x Fresh French Croissant", "2x Pain au Chocolat", "2x Sesame Sourdough Bagels", "2x Specialty Brews"],
  },
  {
    id: "sweet-celebration",
    badge: "PARTY SPECIAL",
    title: "Celebration Cake & Cupcake Bundle",
    subtitle: "1kg Signature Cake (Chocolate Truffle or Red Velvet) + Box of 6 Hand-Decorated Cupcakes.",
    price: "$46.00",
    originalPrice: "$64.00",
    discount: "Save $18",
    code: "PARTYCRUST",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
    items: ["1kg Gourmet Signature Cake", "Box of 6 Assorted Swiss Buttercream Cupcakes", "Free Birthday Sparkler Candles", "Personalized Custom Inscription"],
  },
  {
    id: "afternoon-tea",
    badge: "WEEKEND COMBO",
    title: "Artisan Cookie & Macaron Tin",
    subtitle: "Box of 250g Rosette Butter Cookies + 6-Piece French Macaron Box in Keepsake Velvet Tin.",
    price: "$24.50",
    originalPrice: "$34.50",
    discount: "30% OFF",
    code: "SWEET20",
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=800&auto=format&fit=crop",
    items: ["250g Butter Cookies", "6x Parisian Macarons", "Embossed Gold Sweet Crust Tin", "Complimentary Gift Ribbon"],
  },
];

export interface GalleryItem {
  id: string;
  title: string;
  category: "cakes" | "pastries" | "breads" | "interior";
  image: string;
  caption: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Custom Wedding Cake",
    category: "cakes",
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=800&auto=format&fit=crop",
    caption: "3-tier floral vanilla berry naked wedding cake adorned with edible blossoms.",
  },
  {
    id: "g2",
    title: "Morning Pastry Tray",
    category: "pastries",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop",
    caption: "Freshly pulled French butter croissants golden from our stone deck ovens.",
  },
  {
    id: "g3",
    title: "Stoneground Sourdough",
    category: "breads",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
    caption: "Mahogany ear crust with 48-hour slow cold fermentation.",
  },
  {
    id: "g4",
    title: "Bakehouse Cafe Interior",
    category: "interior",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop",
    caption: "Our sunlit rustic bakery cafe in the heart of the historic quarter.",
  },
  {
    id: "g5",
    title: "Berry Drip Celebration Cake",
    category: "cakes",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop",
    caption: "Belgian dark chocolate ganache drip with fresh raspberries and figs.",
  },
  {
    id: "g6",
    title: "Handmade Fruit Tartlets",
    category: "pastries",
    image: "https://images.unsplash.com/photo-1519915028121-7d346b420b13?q=80&w=800&auto=format&fit=crop",
    caption: "Individual sablé tartlets with Madagascar vanilla bean diplomat cream.",
  },
  {
    id: "g7",
    title: "Artisanal Baguette Display",
    category: "breads",
    image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?q=80&w=800&auto=format&fit=crop",
    caption: "Traditional French tradition baguettes resting in wicker proofing baskets.",
  },
  {
    id: "g8",
    title: "Bakers at Dawn",
    category: "interior",
    image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=800&auto=format&fit=crop",
    caption: "Hand-kneading dough and dusting stone tables with organic rye flour at 4:30 AM.",
  },
];
