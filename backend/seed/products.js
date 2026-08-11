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
    description: "10W fast-charging pad compatible with all Qi-enabled phones.",
    image: "https://images.unsplash.com/photo-1622957461293-1276f56d6f8e?w=600",
    category: "Electronics",
    priceCents: 129900,
    stockCount: 65,
    rating: 4.4,
    reviewCount: 94,
    intendedDarkPatterns: [],
  },
  // ---------------------------------------------------------------
  // FALSE URGENCY (Hindi)
  // ---------------------------------------------------------------
  {
    name: "ब्लूटूथ स्पीकर मिनी",
    slug: "bluetooth-speaker-mini-hi",
    description:
      "Powerful 360-degree sound in a pocket-sized speaker, 12-hour battery. " +
      "आज ही खरीदें -- सेल आज रात खत्म हो रही है!",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
    category: "Electronics",
    priceCents: 189900,
    originalPriceCents: 349900,
    urgencyBadge: "⚡ सेल आज रात खत्म!",
    saleEndsAt: hoursFromNow(5),
    stockCount: 45,
    rating: 4.5,
    reviewCount: 340,
    intendedDarkPatterns: ["false_urgency"],
  },

  // ---------------------------------------------------------------
  // SCARCITY (Nepali)
  // ---------------------------------------------------------------
  {
    name: "स्मार्ट ट्राभल लगेज ब्याग",
    slug: "smart-travel-luggage-bag-ne",
    description:
      "Hardshell 4-wheel luggage with a built-in USB charging port. " +
      "स्टकमा जम्मा १ वटा मात्र बाँकी छ!",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    category: "Fashion",
    priceCents: 459900,
    stockCount: 1,
    lowStockBadge: "स्टकमा १ वटा मात्र बाँकी!",
    rating: 4.6,
    reviewCount: 88,
    intendedDarkPatterns: ["scarcity"],
  },

  // ---------------------------------------------------------------
  // SOCIAL PROOF (Hindi)
  // ---------------------------------------------------------------
  {
    name: "प्रेशर कुकर डीलक्स",
    slug: "pressure-cooker-deluxe-hi",
    description:
      "5-litre stainless steel pressure cooker with a 10-year warranty. " +
      "पिछले 24 घंटों में 212 लोगों ने खरीदा -- 4.9 रेटिंग 3,400+ ग्राहकों से।",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600",
    category: "Home",
    priceCents: 279900,
    rating: 4.9,
    reviewCount: 3412,
    purchasesLast24h: 212,
    viewingNowCount: 34,
    stockCount: 90,
    intendedDarkPatterns: ["social_proof"],
  },

  // ---------------------------------------------------------------
  // FORCED ACTION (Hindi)
  // ---------------------------------------------------------------
  {
    name: "आयुर्वेदिक हेयर केयर सेट",
    slug: "ayurvedic-hair-care-set-hi",
    description:
      "5-piece ayurvedic hair oil, shampoo, and conditioner routine. " +
      "कीमत देखने के लिए मुफ्त खाता बनाएं।",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600",
    category: "Beauty",
    priceCents: 149900,
    requiresAccountToViewPrice: true,
    forcedNewsletterOptIn: true,
    stockCount: 60,
    rating: 4.4,
    reviewCount: 210,
    intendedDarkPatterns: ["forced_action"],
  },

  // ---------------------------------------------------------------
  // OBSTRUCTION (Nepali, subscription)
  // ---------------------------------------------------------------
  {
    name: "योग स्टुडियो सदस्यता",
    slug: "yoga-studio-membership-ne",
    description:
      "Unlimited live and on-demand yoga classes with certified instructors. " +
      "जुनसुकै बेला रद्द गर्न सकिन्छ।",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600",
    category: "Subscription",
    priceCents: 99900,
    isSubscription: true,
    obstructedCancellation: true,
    obstructionNote:
      "सदस्यता रद्द गर्न कृपया हाम्रो सहयोग लाइनमा फोन गर्नुहोस् (सोम-शुक्र, बिहान ९ - साँझ ५) " +
      "र आफ्नो प्रतिनिधिलाई रद्द कोड YOGA-2026 भन्नुहोस्। इमेल वा खाता सेटिङबाट रद्द गर्न सकिँदैन।",
    rating: 4.2,
    reviewCount: 76,
    intendedDarkPatterns: ["obstruction"],
  },

  // ---------------------------------------------------------------
  // SNEAKING (Nepali)
  // ---------------------------------------------------------------
  {
    name: "ट्रेकिङ ब्याकप्याक ४०L",
    slug: "trekking-backpack-40l-ne",
    description:
      "Waterproof 40-litre trekking backpack with a rain cover and hip belt. " +
      "हिमालयी ट्रेकहरूको लागि बनाइएको।",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    category: "Fitness",
    priceCents: 349900,
    hiddenFeeCents: 39900,
    hiddenFeeLabel: "अनिवार्य ह्यान्डलिङ शुल्क",
    preCheckedAddon: {
      enabled: true,
      name: "प्राथमिकता प्रशोधन (सिफारिस गरिएको)",
      priceCents: 19900,
    },
    stockCount: 40,
    rating: 4.6,
    reviewCount: 189,
    intendedDarkPatterns: ["sneaking"],
  },

  // ---------------------------------------------------------------
  // CONFIRMSHAMING (Nepali)
  // ---------------------------------------------------------------
  {
    name: "गेमिङ माउस प्रो",
    slug: "gaming-mouse-pro-ne",
    description:
      "16000 DPI optical gaming mouse with customizable RGB lighting.",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600",
    category: "Electronics",
    priceCents: 199900,
    declineButtonText: "पैसा जोगाउन मन छैन, धन्यवाद",
    stockCount: 55,
    rating: 4.7,
    reviewCount: 402,
    intendedDarkPatterns: ["confirmshaming"],
  },

  // ---------------------------------------------------------------
  // COMBO: False Urgency + Scarcity (Hindi)
  // ---------------------------------------------------------------
  {
    name: "राइस कुकर स्मार्ट",
    slug: "rice-cooker-smart-hi",
    description:
      "Smart rice cooker with 12 pre-set programs and keep-warm function. " +
      "स्टॉक में सिर्फ 2 बचे हैं -- आज की कीमत आधी रात को खत्म!",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600",
    category: "Home",
    priceCents: 219900,
    originalPriceCents: 399900,
    urgencyBadge: "🔥 आज की कीमत आधी रात को खत्म!",
    saleEndsAt: hoursFromNow(11),
    stockCount: 2,
    lowStockBadge: "सिर्फ 2 बचे हैं!",
    rating: 4.5,
    reviewCount: 267,
    intendedDarkPatterns: ["false_urgency", "scarcity"],
  },

  // ---------------------------------------------------------------
  // COMBO: Social Proof + Sneaking (Nepali)
  // ---------------------------------------------------------------
  {
    name: "हिमालयन सल्ट ल्याम्प",
    slug: "himalayan-salt-lamp-ne",
    description:
      "Hand-carved Himalayan salt lamp, said to improve air quality and mood. " +
      "1,800+ ग्राहकहरूबाट 5-तारे समीक्षा।",
    image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600",
    category: "Home",
    priceCents: 89900,
    rating: 4.8,
    reviewCount: 1834,
    purchasesLast24h: 47,
    hiddenFeeCents: 14900,
    hiddenFeeLabel: "प्याकेजिङ तथा सुरक्षा शुल्क",
    stockCount: 100,
    intendedDarkPatterns: ["social_proof", "sneaking"],
  },

  // ---------------------------------------------------------------
  // COMBO: Scarcity + Social Proof (Hindi)
  // ---------------------------------------------------------------
  {
    name: "एयर फ्रायर प्रो",
    slug: "air-fryer-pro-hi",
    description:
      "5.5-litre digital air fryer with 8 pre-set cooking modes. " +
      "केवल 4 बचे हैं -- 89 लोगों ने आज खरीदा।",
    image: "https://images.unsplash.com/photo-1648223842847-f4a6957810b2?w=600",
    category: "Home",
    priceCents: 349900,
    stockCount: 4,
    lowStockBadge: "केवल 4 बचे हैं!",
    rating: 4.7,
    reviewCount: 956,
    purchasesLast24h: 89,
    intendedDarkPatterns: ["scarcity", "social_proof"],
  },

  // ---------------------------------------------------------------
  // FORCED ACTION (Nepali)
  // ---------------------------------------------------------------
  {
    name: "ल्यापटप ब्याग प्रिमियम",
    slug: "laptop-bag-premium-ne",
    description:
      "Water-resistant 15.6-inch laptop bag with anti-theft zippers. " +
      "मूल्य हेर्न निःशुल्क खाता बनाउनुहोस्।",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    category: "Fashion",
    priceCents: 259900,
    requiresAccountToViewPrice: true,
    stockCount: 50,
    rating: 4.5,
    reviewCount: 143,
    intendedDarkPatterns: ["forced_action"],
  },

  // ---------------------------------------------------------------
  // FALSE URGENCY (Hindi)
  // ---------------------------------------------------------------
  {
    name: "स्मार्ट डोरबेल कैमरा",
    slug: "smart-doorbell-camera-hi",
    description:
      "1080p video doorbell with night vision and two-way audio. " +
      "फ्लैश सेल -- केवल आज के लिए 40% छूट!",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600",
    category: "Electronics",
    priceCents: 419900,
    originalPriceCents: 699900,
    urgencyBadge: "⚡ केवल आज के लिए 40% छूट!",
    saleEndsAt: hoursFromNow(7),
    stockCount: 30,
    rating: 4.4,
    reviewCount: 512,
    intendedDarkPatterns: ["false_urgency"],
  },

  // ---------------------------------------------------------------
  // CLEAN CONTROLS (Hindi / Nepali) -- true negatives
  // ---------------------------------------------------------------
  {
    name: "सिरेमिक फूलदान सेट",
    slug: "ceramic-vase-set-hi",
    description:
      "Two hand-glazed ceramic vases, 20cm and 15cm, matte white finish.",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600",
    category: "Home",
    priceCents: 129900,
    stockCount: 75,
    rating: 4.5,
    reviewCount: 62,
    intendedDarkPatterns: [],
  },
  {
    name: "पश्मिना स्कार्फ",
    slug: "pashmina-scarf-ne",
    description:
      "Handwoven pashmina scarf, 70x200cm, made from Himalayan wool.",
    image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=600",
    category: "Fashion",
    priceCents: 199900,
    stockCount: 55,
    rating: 4.7,
    reviewCount: 118,
    intendedDarkPatterns: [],
  },
  {
    name: "अर्गानिक टी सेट",
    slug: "organic-tea-set-ne",
    description:
      "A 4-flavour gift box of organic Himalayan tea leaves, 400g total.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600",
    category: "Home",
    priceCents: 79900,
    stockCount: 130,
    rating: 4.6,
    reviewCount: 94,
    intendedDarkPatterns: [],
  },
  // =================================================================
  // BENIGN HARD NEGATIVES -- same surface feature as the dark version
  // in each class, framed legitimately. These are the real test of
  // whether the classifier keys on manipulative framing rather than
  // just "contains a number / deadline / cancel flow".
  // =================================================================

  // --- Benign counterpart to Scarcity: static, verifiable stock count ---
  {
    name: "Terracotta Plant Pot (Medium)",
    slug: "terracotta-plant-pot-medium",
    description:
      "Hand-thrown terracotta pot with drainage hole, 18cm diameter. " +
      "In stock: 12 units.",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600",
    category: "Home",
    priceCents: 79900,
    stockCount: 12,
    rating: 4.5,
    reviewCount: 44,
    intendedDarkPatterns: [],
  },

  // --- Benign counterpart to False Urgency: a real stated deadline, not a countdown ---
  {
    name: "Handmade Ceramic Mug (Blue Glaze)",
    slug: "handmade-ceramic-mug-blue",
    description:
      "Wheel-thrown ceramic mug, 350ml, dishwasher safe. " +
      "Order in 2 hours for delivery in 3 days. Our winter sale ends 31 December.",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600",
    category: "Home",
    priceCents: 69900,
    stockCount: 85,
    rating: 4.6,
    reviewCount: 71,
    intendedDarkPatterns: [],
  },

  // --- Benign counterpart to Social Proof: static, verified aggregate ---
  {
    name: "Cast Iron Skillet 10-inch",
    slug: "cast-iron-skillet-10inch",
    description:
      "Pre-seasoned cast iron skillet, oven-safe up to 500°F. " +
      "958 sold. Rated by 200 verified buyers.",
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600",
    category: "Home",
    priceCents: 189900,
    rating: 4.7,
    reviewCount: 200,
    stockCount: 65,
    intendedDarkPatterns: [],
  },

  // --- Benign counterpart to Confirmshaming: a plain "Cancel" ---
  {
    name: "Merino Wool Beanie",
    slug: "merino-wool-beanie",
    description:
      "100% merino wool beanie, one size. You can unsubscribe from promotional " +
      "emails anytime from your account settings -- no discount popup, just a " +
      'plain "Cancel" if you change your mind.',
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600",
    category: "Fashion",
    priceCents: 89900,
    stockCount: 90,
    rating: 4.5,
    reviewCount: 58,
    intendedDarkPatterns: [],
  },

  // --- Benign counterpart to Forced Action: sign-in that gates nothing ---
  {
    name: "Recycled Glass Tumbler Set",
    slug: "recycled-glass-tumbler-set",
    description:
      "Set of 4 hand-blown tumblers made from recycled glass, 300ml each. " +
      "Sign in for member pricing and order tracking -- price and checkout are " +
      "fully available as a guest either way.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600",
    category: "Home",
    priceCents: 109900,
    requiresAccountToViewPrice: false,
    stockCount: 70,
    rating: 4.4,
    reviewCount: 37,
    intendedDarkPatterns: [],
  },

  // --- Benign counterpart to Obstruction: easy cancellation ---
  {
    name: "Monthly Book Club Box",
    slug: "monthly-book-club-box",
    description:
      "A curated novel delivered monthly, with reading notes and a tote bag. " +
      "You can cancel anytime from your account settings, or contact us for help " +
      "if you'd rather we do it for you.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600",
    category: "Subscription",
    priceCents: 129900,
    isSubscription: true,
    obstructedCancellation: false,
    obstructionNote:
      "Cancel anytime from Account Settings > Subscriptions, or contact us for help.",
    rating: 4.6,
    reviewCount: 112,
    intendedDarkPatterns: [],
  },

  // --- Benign counterpart to Sneaking: an advertised, upfront discount ---
  {
    name: "Bamboo Cutting Board Set",
    slug: "bamboo-cutting-board-set",
    description:
      "Set of 3 bamboo cutting boards, sustainably sourced. " +
      "20% off this week -- discount already applied to the price shown, no fees added at checkout.",
    image: "https://images.unsplash.com/photo-1584479898061-15742e14f50d?w=600",
    category: "Home",
    priceCents: 71920,
    originalPriceCents: 89900,
    hiddenFeeCents: 0,
    stockCount: 100,
    rating: 4.7,
    reviewCount: 84,
    intendedDarkPatterns: [],
  },

  // --- Plain benign, no special framing at all ---
  {
    name: "Linen Table Runner",
    slug: "linen-table-runner",
    description: "100% linen table runner, 180cm, machine washable.",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600",
    category: "Home",
    priceCents: 64900,
    stockCount: 110,
    rating: 4.4,
    reviewCount: 26,
    intendedDarkPatterns: [],
  },
];
