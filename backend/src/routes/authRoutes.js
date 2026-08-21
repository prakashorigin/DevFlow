import express from "express";
import * as auth from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { forgotPasswordValidation, loginValidation, registerValidation, resetPasswordValidation, verificationValidation } from "../validators/authValidators.js";

const router = express.Router();
router.post("/register", registerValidation, auth.register);
router.post("/login", loginValidation, auth.login);
router.post("/refresh-token", auth.refresh);
router.post("/forgot-password", forgotPasswordValidation, auth.forgotPassword);
router.post("/reset-password", resetPasswordValidation, auth.resetPassword);
router.use(protect);
router.post("/logout", auth.logout);
router.post("/verify", verificationValidation, auth.verify);
export default router;
