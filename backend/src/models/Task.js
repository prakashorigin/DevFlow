import mongoose from "mongoose";

export default mongoose.model("Task", new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, trim: true, maxlength: 5000, default: "" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  priority: { type: String, enum: ["low", "medium", "high", "critical"], default: "medium" },
  status: { type: String, enum: ["todo", "in_progress", "in_review", "completed"], default: "todo" },
  dueDate: Date,
  labels: [{ type: String, trim: true }],
  estimatedHours: { type: Number, min: 0, default: 0 },
}, { timestamps: true }));
