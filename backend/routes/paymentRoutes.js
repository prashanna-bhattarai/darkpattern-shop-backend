import express from "express";
import {
  initiateEsewaPayment,
  handleEsewaSuccess,
  handleEsewaFailure,
  getOrder,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/esewa/initiate", protect, initiateEsewaPayment);
router.get("/esewa/success", handleEsewaSuccess); // hit directly by eSewa's redirect, no auth
router.get("/esewa/failure", handleEsewaFailure);
router.get("/order/:id", protect, getOrder);

export default router;