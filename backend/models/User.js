import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const cartItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    // Sneaking: some addons get silently attached to a cart item rather than
    // shown as their own line item, mirroring how real "protection plan" /
    // "priority processing" upsells are frequently hidden in checkout flows.
    addons: [
      {
        name: String,
        priceCents: Number,
      },
    ],
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    cart: [cartItemSchema],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.createPasswordResetToken = function () {
  const rawToken = crypto.randomBytes(32).toString("hex");
  this.resetPasswordToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  this.resetPasswordExpires = Date.now() + 1000 * 60 * 30; // 30 minutes
  return rawToken; // the raw (unhashed) token is what goes in the emailed link
};

export default mongoose.model("User", userSchema);
