import crypto from "crypto";
import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const createAccessToken = (user) => jwt.sign(
  { sub: user._id.toString(), role: user.role },
  env.jwtSecret,
  { expiresIn: "15m" },
);

export const createRefreshToken = (user) => jwt.sign(
  { sub: user._id.toString() },
  env.jwtRefreshSecret,
  { expiresIn: "7d" },
);

export const createCode = () => crypto.randomInt(100000, 1000000).toString();

export const hashValue = (value) => crypto.createHash("sha256").update(value).digest("hex");
