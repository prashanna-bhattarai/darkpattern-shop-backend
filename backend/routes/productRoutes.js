import express from "express";
import {
  getProducts,
  getProductBySlug,
  getCategories,
  searchProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/categories", getCategories);
router.get("/search", searchProducts); // must come before /:slug
router.get("/:slug", getProductBySlug);

export default router;
