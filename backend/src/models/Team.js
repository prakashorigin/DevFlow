import mongoose from "mongoose";

export default mongoose.model("Team", new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, role: { type: String, default: "member" } }],
}, { timestamps: true }));
