import mongoose from "mongoose";

export default mongoose.model("Notification", new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  title: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  type: { type: String, enum: ["task", "project", "issue", "review", "system"], default: "system" },
  link: { type: String, default: "" },
  read: { type: Boolean, default: false },
}, { timestamps: true }));
