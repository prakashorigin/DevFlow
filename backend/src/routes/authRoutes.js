import express from "express";
import { body } from "express-validator";
import * as auth from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();
const password = body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long");
router.post("/register", [body("name").trim().isLength({ min: 2 }), body("username").trim().matches(/^[a-zA-Z0-9_]{3,30}$/), body("email").isEmail().normalizeEmail(), password, validate], auth.register);
router.post("/login", [body("identifier").trim().notEmpty(), body("password").notEmpty(), validate], auth.login);
router.post("/refresh-token", auth.refresh);
router.post("/forgot-password", [body("identifier").trim().notEmpty(), validate], auth.forgotPassword);
router.post("/reset-password", [body("identifier").trim().notEmpty(), body("code").isLength({ min: 6, max: 6 }), password, validate], auth.resetPassword);
router.use(protect);
router.post("/logout", auth.logout);
router.post("/verify", [body("code").isLength({ min: 6, max: 6 }), validate], auth.verify);
export default router;
