import express from "express";
import {
  register,
  login,
  logout,
  me,
  forgotPassword,
  resetPassword,
  changePassword,
  updateProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, me);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/change-password", protect, changePassword);
router.put("/profile", protect, updateProfile);

export default router;
