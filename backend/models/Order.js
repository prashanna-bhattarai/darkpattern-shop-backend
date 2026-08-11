import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lineItems: [
      {
        name: String,
        quantity: Number,
        priceCents: Number,
        addons: [{ name: String, priceCents: Number }],
      },
    ],
    subtotalCents: { type: Number, required: true },
    addonsCents: { type: Number, default: 0 },
    hiddenFeesCents: { type: Number, default: 0 },
    totalCents: { type: Number, required: true },
    transactionUuid: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paidAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
