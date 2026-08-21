import mongoose from "mongoose";

export default mongoose.model("VerificationCode", new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  codeHash: { type: String, required: true },
  purpose: { type: String, enum: ["verify_email", "password_reset"], required: true },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
}, { timestamps: true }));
