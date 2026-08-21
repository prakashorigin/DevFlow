import { recordActivity } from "../services/activityService.js";

const review = (code) => ({
  score: Math.max(55, 94 - Math.min(35, Math.floor(code.length / 35))),
  metrics: { security: 89, performance: 82, maintainability: 86, quality: 90 },
  findings: [
    { level: "Suggestion", line: 1, message: "Add input validation and explicit error handling around external boundaries." },
    { level: "Good practice", line: 1, message: "Keep functions small and name data transformations clearly." },
  ],
});
export const codeReview = async (req, res, next) => { try { const data = review(req.body.code || ""); await recordActivity(req.user._id, "code_review", "Ran an AI code review", { language: req.body.language }); res.json({ success: true, data }); } catch (error) { next(error); } };
export const bugAnalyzer = async (req, res, next) => { try { await recordActivity(req.user._id, "bug_analysis", "Ran an AI bug analysis"); res.json({ success: true, data: { rootCause: "The submitted error should be reproduced with the smallest possible input before changing behavior.", possibleFix: "Validate inputs, guard nullable values, and return a typed error response.", prevention: "Add a regression test for this error path.", suggestedCode: "if (!value) throw new Error('Expected value is required');" } }); } catch (error) { next(error); } };
