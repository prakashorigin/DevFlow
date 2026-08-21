import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  description: { type: String, trim: true, maxlength: 2000, default: "" },
  status: { type: String, enum: ["planning", "active", "on_hold", "completed", "archived"], default: "planning" },
  priority: { type: String, enum: ["low", "medium", "high", "critical"], default: "medium" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dueDate: Date,
  labels: [{ type: String, trim: true }],
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

projectSchema.virtual("progress", { ref: "Task", localField: "_id", foreignField: "project", justOne: false });
export default mongoose.model("Project", projectSchema);
