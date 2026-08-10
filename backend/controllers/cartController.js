import User from "../models/User.js";
import Product from "../models/Product.js";

export const getCart = async (req, res) => {
  const user = await User.findById(req.user._id).populate("cart.product");
  res.status(200).json({ cart: user.cart });
};

// Replaces the server-side cart wholesale with the client's current cart --
// used once, right after login, to merge a guest's localStorage cart into
// their account.
export const syncCart = async (req, res) => {
  try {
    const { items } = req.body; // [{ productId, quantity }]
    const user = await User.findById(req.user._id);

    const merged = new Map();
    for (const existing of user.cart) {
      merged.set(String(existing.product), existing);
    }
    for (const incoming of items || []) {
      const key = String(incoming.productId);
      if (merged.has(key)) {
        merged.get(key).quantity += incoming.quantity;
      } else {
        merged.set(key, { product: incoming.productId, quantity: incoming.quantity, addons: [] });
      }
    }

    user.cart = Array.from(merged.values());
    await user.save();

    const populated = await User.findById(req.user._id).populate("cart.product");
    res.status(200).json({ cart: populated.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const user = await User.findById(req.user._id);
    const existing = user.cart.find((i) => String(i.product) === String(productId));

    if (existing) {
      existing.quantity += quantity;
    } else {
      const addons = [];
      // Sneaking: a pre-checked addon is silently attached the first time
      // this product is added to a cart, exactly as configured on the
      // product itself -- the frontend is expected to show this addon as
      // already ticked, not ask the user to opt in.
      if (product.preCheckedAddon?.enabled) {
        addons.push({
          name: product.preCheckedAddon.name,
          priceCents: product.preCheckedAddon.priceCents,
        });
      }
      user.cart.push({ product: productId, quantity, addons });
    }

    await user.save();
    const populated = await User.findById(req.user._id).populate("cart.product");
    res.status(200).json({ cart: populated.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const user = await User.findById(req.user._id);
    const item = user.cart.find((i) => String(i.product) === String(productId));
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    if (quantity <= 0) {
      user.cart = user.cart.filter((i) => String(i.product) !== String(productId));
    } else {
      item.quantity = quantity;
    }

    await user.save();
    const populated = await User.findById(req.user._id).populate("cart.product");
    res.status(200).json({ cart: populated.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter((i) => String(i.product) !== String(productId));
    await user.save();
    const populated = await User.findById(req.user._id).populate("cart.product");
    res.status(200).json({ cart: populated.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// A deliberately simplified checkout: no real payment integration, since
// this site exists to test dark-pattern detection, not to process real
// orders. It computes and returns an itemized total -- including any hidden
// fees and pre-checked addons -- and empties the cart.
export const checkout = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.product");

    let subtotalCents = 0;
    let addonsCents = 0;
    let hiddenFeesCents = 0;
    const lineItems = [];

    for (const item of user.cart) {
      const lineTotal = item.product.priceCents * item.quantity;
      subtotalCents += lineTotal;

      const addonTotal = (item.addons || []).reduce((sum, a) => sum + a.priceCents, 0);
      addonsCents += addonTotal * item.quantity;

      hiddenFeesCents += (item.product.hiddenFeeCents || 0) * item.quantity;

      lineItems.push({
        name: item.product.name,
        quantity: item.quantity,
        priceCents: item.product.priceCents,
        addons: item.addons,
      });
    }

    const totalCents = subtotalCents + addonsCents + hiddenFeesCents;

    user.cart = [];
    await user.save();

    res.status(200).json({
      order: {
        lineItems,
        subtotalCents,
        addonsCents,
        hiddenFeesCents,
        totalCents,
        placedAt: new Date(),
      },
      message: "Order placed (demo checkout -- no real payment was processed).",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
