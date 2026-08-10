// Each product below is deliberately built to exercise a specific
// dark-pattern class (or, for the "combo" ones, more than one at once, since
// the classifier is multi-label). `intendedDarkPatterns` documents the
// design intent for your own report/testing reference -- it is never sent
// to the frontend UI.

const hoursFromNow = (h) => new Date(Date.now() + h * 60 * 60 * 1000);

export const buildProducts = () => [
  // ---------------------------------------------------------------
  // 1. FALSE URGENCY
  // ---------------------------------------------------------------
  {
    name: "Wireless Bluetooth Earbuds Pro",
    slug: "wireless-earbuds-pro",
    description:
      "Immersive sound, active noise cancellation, and 30-hour battery life. " +
      "Flash Sale ends today -- grab this deal before the countdown runs out!",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600",
    category: "Electronics",
    priceCents: 249900,
    originalPriceCents: 499900,
    urgencyBadge: "⚡ Flash Sale ends today!",
    saleEndsAt: hoursFromNow(6),
    stockCount: 40,
    rating: 4.4,
    reviewCount: 812,
    intendedDarkPatterns: ["false_urgency"],
  },

  // ---------------------------------------------------------------
  // 2. SCARCITY
  // ---------------------------------------------------------------
  {
    name: "Genuine Leather Bifold Wallet",
    slug: "leather-bifold-wallet",
    description:
      "Handcrafted full-grain leather wallet with RFID-blocking lining. " +
      "Only 2 left in stock -- once these are gone, this batch will not be restocked.",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600",
    category: "Fashion",
    priceCents: 349900,
    stockCount: 2,
    lowStockBadge: "Only 2 left in stock!",
    rating: 4.6,
    reviewCount: 203,
    intendedDarkPatterns: ["scarcity"],
  },

  // ---------------------------------------------------------------
  // 3. SOCIAL PROOF
  // ---------------------------------------------------------------
  {
    name: "Smart Fitness Watch Series X",
    slug: "smart-fitness-watch-x",
    description:
      "Track heart rate, sleep, and workouts with a bright always-on display. " +
      "Trending now -- 134 people bought this in the last 24 hours, rated 4.8 by over 2,300 customers.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    category: "Electronics",
    priceCents: 599900,
    rating: 4.8,
    reviewCount: 2341,
    purchasesLast24h: 134,
    viewingNowCount: 27,
    stockCount: 60,
    intendedDarkPatterns: ["social_proof"],
  },

  // ---------------------------------------------------------------
  // 4. FORCED ACTION
  // ---------------------------------------------------------------
  {
    name: "Premium Skincare Gift Set",
    slug: "premium-skincare-gift-set",
    description:
      "A curated 5-piece skincare routine including cleanser, serum, and moisturizer. " +
      "Create a free account to reveal member pricing on this set.",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600",
    category: "Beauty",
    priceCents: 189900,
    requiresAccountToViewPrice: true,
    forcedNewsletterOptIn: true,
    stockCount: 25,
    rating: 4.3,
    reviewCount: 156,
    intendedDarkPatterns: ["forced_action"],
  },

  // ---------------------------------------------------------------
  // 5. OBSTRUCTION (subscription-style product)
  // ---------------------------------------------------------------
  {
    name: "CloudFit Premium Membership",
    slug: "cloudfit-premium-membership",
    description:
      "Unlimited access to CloudFit's on-demand workout library, updated weekly. " +
      "Cancel anytime.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
    category: "Subscription",
    priceCents: 149900,
    isSubscription: true,
    obstructedCancellation: true,
    obstructionNote:
      "To cancel your membership, please call our support line (Mon-Fri, 9am-5pm) " +
      "and provide cancellation code CANCEL-2026 to your representative. Cancellation " +
      "requests cannot be processed by email or through your account settings.",
    rating: 4.1,
    reviewCount: 98,
    intendedDarkPatterns: ["obstruction"],
  },

  // ---------------------------------------------------------------
  // 6. SNEAKING
  // ---------------------------------------------------------------
  {
    name: "Professional 8-Piece Chef Knife Set",
    slug: "chef-knife-set-8pc",
    description:
      "Forged high-carbon stainless steel knives with an ergonomic walnut block. " +
      "Built for home cooks who want restaurant-grade results.",
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600",
    category: "Home",
    priceCents: 449900,
    hiddenFeeCents: 49900,
    hiddenFeeLabel: "Mandatory Handling & Insurance Fee",
    preCheckedAddon: {
      enabled: true,
      name: "Priority Processing (recommended)",
      priceCents: 29900,
    },
    stockCount: 35,
    rating: 4.5,
    reviewCount: 421,
    intendedDarkPatterns: ["sneaking"],
  },

  // ---------------------------------------------------------------
  // 7. CONFIRMSHAMING
  // ---------------------------------------------------------------
  {
    name: "Studio Noise-Cancelling Headphones",
    slug: "studio-noise-cancelling-headphones",
    description:
      "Studio-grade over-ear headphones with adaptive noise cancellation and " +
      "40mm drivers for accurate, detailed sound.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    category: "Electronics",
    priceCents: 799900,
    declineButtonText: "No thanks, I enjoy overpaying for headphones",
    stockCount: 50,
    rating: 4.7,
    reviewCount: 634,
    intendedDarkPatterns: ["confirmshaming"],
  },

  // ---------------------------------------------------------------
  // 8. COMBO: False Urgency + Scarcity (multi-label)
  // ---------------------------------------------------------------
  {
    name: "1080p Home Security Camera",
    slug: "home-security-camera-1080p",
    description:
      "Weatherproof outdoor security camera with night vision and motion alerts. " +
      "Only 3 left in stock -- today's deal price ends at midnight!",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600",
    category: "Electronics",
    priceCents: 329900,
    originalPriceCents: 549900,
    urgencyBadge: "🔥 Today's deal price ends at midnight!",
    saleEndsAt: hoursFromNow(9),
    stockCount: 3,
    lowStockBadge: "Only 3 left in stock!",
    rating: 4.5,
    reviewCount: 289,
    intendedDarkPatterns: ["false_urgency", "scarcity"],
  },

  // ---------------------------------------------------------------
  // 9. COMBO: Social Proof + Sneaking (multi-label)
  // ---------------------------------------------------------------
  {
    name: "Premium Non-Slip Yoga Mat",
    slug: "premium-yoga-mat",
    description:
      "Extra-thick eco-friendly yoga mat with alignment guide lines. " +
      "Over 1,024 verified 5-star reviews from yogis worldwide.",
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=600",
    category: "Fitness",
    priceCents: 129900,
    rating: 4.9,
    reviewCount: 1024,
    purchasesLast24h: 61,
    hiddenFeeCents: 9900,
    hiddenFeeLabel: "Eco-Packaging Fee",
    stockCount: 80,
    intendedDarkPatterns: ["social_proof", "sneaking"],
  },

  // ---------------------------------------------------------------
  // CLEAN CONTROLS -- no dark patterns at all, for true-negative testing
  // ---------------------------------------------------------------
  {
    name: "Ceramic Coffee Mug (Set of 2)",
    slug: "ceramic-coffee-mug-set",
    description:
      "Two 350ml ceramic mugs with a matte glaze finish. Dishwasher and microwave safe.",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600",
    category: "Home",
    priceCents: 89900,
    stockCount: 120,
    rating: 4.4,
    reviewCount: 87,
    intendedDarkPatterns: [],
  },
  {
    name: "Organic Cotton Bath Towel Set",
    slug: "cotton-bath-towel-set",
    description:
      "Set of 4 bath towels woven from 100% organic cotton. Machine washable.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600",
    category: "Home",
    priceCents: 159900,
    stockCount: 95,
    rating: 4.6,
    reviewCount: 142,
    intendedDarkPatterns: [],
  },
  {
    name: "A5 Dotted Notebook (2-Pack)",
    slug: "a5-dotted-notebook-2pack",
    description:
      "Two 160-page dotted notebooks with a soft cover, ideal for journaling or bullet planning.",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600",
    category: "Stationery",
    priceCents: 69900,
    stockCount: 200,
    rating: 4.5,
    reviewCount: 63,
    intendedDarkPatterns: [],
  },
  {
    name: "Bamboo Desk Organizer",
    slug: "bamboo-desk-organizer",
    description:
      "A compact bamboo organizer with compartments for pens, cards, and a phone stand.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600",
    category: "Home",
    priceCents: 119900,
    stockCount: 70,
    rating: 4.3,
    reviewCount: 51,
    intendedDarkPatterns: [],
  },
  {
    name: "Stainless Steel Water Bottle 1L",
    slug: "stainless-steel-water-bottle",
    description:
      "Double-walled insulated bottle that keeps drinks cold for 24 hours or hot for 12.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600",
    category: "Fitness",
    priceCents: 99900,
    stockCount: 110,
    rating: 4.7,
    reviewCount: 176,
    intendedDarkPatterns: [],
  },
  {
    name: "Wireless Charging Pad",
    slug: "wireless-charging-pad",
    description:
      "10W fast-charging pad compatible with all Qi-enabled phones.",
    image: "https://images.unsplash.com/photo-1622957461293-1276f56d6f8e?w=600",
    category: "Electronics",
    priceCents: 129900,
    stockCount: 65,
    rating: 4.4,
    reviewCount: 94,
    intendedDarkPatterns: [],
  },
];
