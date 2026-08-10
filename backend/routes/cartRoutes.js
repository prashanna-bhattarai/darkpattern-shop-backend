import express from "express";
import {
  getCart,
  syncCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  checkout,
} from "../controllers/cartController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect); // guest carts are handled entirely client-side; these routes are for logged-in users only

router.get("/", getCart);
router.post("/sync", syncCart);
router.post("/", addToCart);
router.put("/:productId", updateCartItem);
router.delete("/:productId", removeCartItem);
router.post("/checkout", checkout);

export default router;
