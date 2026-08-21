import { body } from "express-validator";
import { validate } from "../middleware/validate.js";

const password = body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long");

export const registerValidation = [
  body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters long"),
  body("username").trim().matches(/^[a-zA-Z0-9_]{3,30}$/).withMessage("Username must use 3–30 letters, numbers, or underscores"),
  body("email").isEmail().normalizeEmail().withMessage("Enter a valid email address"),
  password,
  validate,
];

export const loginValidation = [body("identifier").trim().notEmpty().withMessage("Email, username, or phone is required"), body("password").notEmpty().withMessage("Password is required"), validate];
export const forgotPasswordValidation = [body("identifier").trim().notEmpty().withMessage("Email, username, or phone is required"), validate];
export const resetPasswordValidation = [body("identifier").trim().notEmpty(), body("code").isLength({ min: 6, max: 6 }).withMessage("Enter the six-digit reset code"), password, validate];
export const verificationValidation = [body("code").isLength({ min: 6, max: 6 }).withMessage("Enter the six-digit verification code"), validate];
