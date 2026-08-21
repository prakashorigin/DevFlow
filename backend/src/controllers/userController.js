import bcrypt from "bcryptjs";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import { recordActivity } from "../services/activityService.js";

export const getMe = (req, res) => res.json({ success: true, data: req.user });
export const updateMe = async (req, res, next) => {
  try {
    const allowed = ["name", "username", "phone", "avatar", "bio", "location", "jobTitle", "website", "github", "linkedin", "theme"];
    const changes = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
    const user = await User.findByIdAndUpdate(req.user._id, changes, { new: true, runValidators: true });
    await recordActivity(user._id, "profile_updated", "Updated their profile");
    res.json({ success: true, data: user });
  } catch (error) { next(error); }
};
export const changePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("+password");
    if (!(await bcrypt.compare(req.body.currentPassword, user.password))) throw new AppError("Current password is incorrect", 422);
    user.password = req.body.password; user.refreshTokenHash = ""; await user.save();
    await recordActivity(user._id, "password_changed", "Changed their password");
    res.json({ success: true, message: "Password changed. Please sign in again." });
  } catch (error) { next(error); }
};
