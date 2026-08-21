import jwt from "jsonwebtoken";
import User from "../models/User.js";
import env from "../config/env.js";
import AppError from "../utils/AppError.js";

export const protect = async (req, _res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) throw new AppError("Authentication is required", 401);
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(payload.sub);
    if (!user || !user.isActive) throw new AppError("Your session is no longer valid", 401);
    req.user = user;
    next();
  } catch (error) {
    next(error.name === "JsonWebTokenError" || error.name === "TokenExpiredError" ? new AppError("Invalid or expired access token", 401) : error);
  }
};

export const allowRoles = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user.role)) return next(new AppError("You do not have permission to perform this action", 403));
  next();
};
