import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    priceCents: { type: Number, required: true },
    originalPriceCents: { type: Number },

    // --- Scarcity ---
    stockCount: { type: Number, default: 50 },
    lowStockBadge: { type: String }, // e.g. "Only 2 left in stock!"

    // --- False Urgency ---
    saleEndsAt: { type: Date }, // countdown timer target
    urgencyBadge: { type: String }, // e.g. "Flash Sale ends today!"

    // --- Social Proof ---
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 0 },
    purchasesLast24h: { type: Number, default: 0 },
    viewingNowCount: { type: Number, default: 0 },

    // --- Sneaking ---
    hiddenFeeCents: { type: Number, default: 0 }, // added silently at checkout
    hiddenFeeLabel: { type: String },
    preCheckedAddon: {
      enabled: { type: Boolean, default: false },
      name: String,
      priceCents: Number,
    },

    // --- Forced Action ---
    requiresAccountToViewPrice: { type: Boolean, default: false },
    forcedNewsletterOptIn: { type: Boolean, default: false },

    // --- Obstruction ---
    obstructedCancellation: { type: Boolean, default: false }, // subscription-style product
    obstructionNote: { type: String },

    // --- Confirmshaming ---
    declineButtonText: { type: String }, // shown on discount popup, e.g.
    // "No thanks, I like paying full price"

    // Documents which dark-pattern classes this product was deliberately
    // built to trigger, and which are deliberately absent (clean controls).
    // Purely for report/testing reference -- not shown in the UI.
    intendedDarkPatterns: [{ type: String }],

    isSubscription: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
