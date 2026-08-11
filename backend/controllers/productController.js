import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const { category, section } = req.query;
    const filter = {};
    if (category) filter.category = category;
    filter.section = section || "shop"; // defaults to the main shop, not new-arrivals
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json({ categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || !q.trim()) {
      return res.status(200).json({ products: [] });
    }
    const regex = new RegExp(q.trim(), "i"); // case-insensitive, matches Hindi/Nepali too
    const products = await Product.find({
      $or: [{ name: regex }, { description: regex }, { category: regex }],
    }).limit(30);
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
