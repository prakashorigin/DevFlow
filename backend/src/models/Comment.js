import mongoose from "mongoose";

export default mongoose.model("Comment", new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  issue: { type: mongoose.Schema.Types.ObjectId, ref: "Issue" },
  task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  body: { type: String, required: true, trim: true, maxlength: 5000 },
}, { timestamps: true }));
