import express from "express";
import { body } from "express-validator";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { bugAnalyzer, codeReview } from "../controllers/aiController.js";
const router = express.Router(); router.use(protect);
router.post("/code-review", [body("code").trim().notEmpty(), body("language").trim().notEmpty(), validate], codeReview);
router.post("/bug-analyzer", [body("code").optional().trim(), validate], bugAnalyzer);
export default router;
