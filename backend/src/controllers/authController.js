import jwt from "jsonwebtoken";
import User from "../models/User.js";
import VerificationCode from "../models/VerificationCode.js";
import AppError from "../utils/AppError.js";
import { createAccessToken, createCode, createRefreshToken, hashValue } from "../utils/tokens.js";
import env from "../config/env.js";
import { recordActivity } from "../services/activityService.js";

const publicUser = (user) => user.toJSON();
const tokenPayload = async (user) => {
  const refreshToken = createRefreshToken(user);
  user.refreshTokenHash = hashValue(refreshToken);
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });
  return { user: publicUser(user), accessToken: createAccessToken(user), refreshToken };
};

export const register = async (req, res, next) => {
  try {
    const { name, username, email, phone, password } = req.body;
    const exists = await User.exists({ $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }] });
    if (exists) throw new AppError("An account with that email or username already exists", 409);
    const user = await User.create({ name, username, email, phone, password });
    const code = createCode();
    await VerificationCode.create({ user: user._id, codeHash: hashValue(code), purpose: "verify_email", expiresAt: new Date(Date.now() + 15 * 60 * 1000) });
    await recordActivity(user._id, "account_created", "Created their DevFlow account");
    res.status(201).json({ success: true, message: "Account created. Verify your email to continue.", data: { user: publicUser(user), verificationCode: env.nodeEnv === "development" ? code : undefined } });
  } catch (error) { next(error); }
};

export const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;
    const user = await User.findOne({ $or: [{ email: identifier.toLowerCase() }, { username: identifier.toLowerCase() }, { phone: identifier }] }).select("+password +refreshTokenHash");
    if (!user || !(await user.comparePassword(password))) throw new AppError("Invalid credentials", 401);
    if (!user.isActive) throw new AppError("This account has been disabled", 403);
    const data = await tokenPayload(user);
    await recordActivity(user._id, "logged_in", "Signed in to DevFlow");
    res.json({ success: true, message: "Welcome back", data });
  } catch (error) { next(error); }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new AppError("Refresh token is required", 401);
    const payload = jwt.verify(refreshToken, env.jwtRefreshSecret);
    const user = await User.findById(payload.sub).select("+refreshTokenHash");
    if (!user || user.refreshTokenHash !== hashValue(refreshToken)) throw new AppError("Invalid refresh token", 401);
    res.json({ success: true, data: await tokenPayload(user) });
  } catch (error) { next(error.name === "JsonWebTokenError" || error.name === "TokenExpiredError" ? new AppError("Invalid or expired refresh token", 401) : error); }
};

export const logout = async (req, res, next) => {
  try { req.user.refreshTokenHash = ""; await req.user.save({ validateBeforeSave: false }); res.json({ success: true, message: "Signed out successfully" }); } catch (error) { next(error); }
};

export const verify = async (req, res, next) => {
  try {
    const record = await VerificationCode.findOne({ user: req.user._id, purpose: "verify_email", codeHash: hashValue(req.body.code) });
    if (!record || record.expiresAt < new Date()) throw new AppError("Invalid or expired verification code", 422);
    req.user.emailVerified = true; await req.user.save({ validateBeforeSave: false }); await record.deleteOne();
    res.json({ success: true, message: "Email verified successfully" });
  } catch (error) { next(error); }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { identifier } = req.body;
    const user = await User.findOne({ $or: [{ email: identifier.toLowerCase() }, { username: identifier.toLowerCase() }, { phone: identifier }] });
    if (!user) return res.json({ success: true, message: "If an account exists, a reset code has been sent." });
    await VerificationCode.deleteMany({ user: user._id, purpose: "password_reset" });
    const code = createCode();
    await VerificationCode.create({ user: user._id, codeHash: hashValue(code), purpose: "password_reset", expiresAt: new Date(Date.now() + 15 * 60 * 1000) });
    res.json({ success: true, message: "Reset code created.", data: { verificationCode: env.nodeEnv === "development" ? code : undefined } });
  } catch (error) { next(error); }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { identifier, code, password } = req.body;
    const user = await User.findOne({ $or: [{ email: identifier.toLowerCase() }, { username: identifier.toLowerCase() }, { phone: identifier }] }).select("+password");
    const record = user && await VerificationCode.findOne({ user: user._id, purpose: "password_reset", codeHash: hashValue(code) });
    if (!record || record.expiresAt < new Date()) throw new AppError("Invalid or expired reset code", 422);
    user.password = password; user.refreshTokenHash = ""; await user.save(); await record.deleteOne();
    res.json({ success: true, message: "Password reset successfully. You can now sign in." });
  } catch (error) { next(error); }
};
