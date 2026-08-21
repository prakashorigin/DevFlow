import mongoose from "mongoose";

export default mongoose.model("Issue", new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, trim: true, maxlength: 5000, default: "" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  priority: { type: String, enum: ["low", "medium", "high", "critical"], default: "medium" },
  status: { type: String, enum: ["open", "in_progress", "resolved", "closed"], default: "open" },
  labels: [{ type: String, trim: true }],
  dueDate: Date,
}, { timestamps: true }));
