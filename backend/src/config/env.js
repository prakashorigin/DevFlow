import dotenv from "dotenv";

dotenv.config();

const env = {
  port: Number(process.env.PORT) || 6002,

  clientUrl: process.env.CLIENT_URL || "http://localhost:4002",

  // A local development database is useful when an Atlas URI is unavailable
  // or intentionally kept for production. Production continues to use
  // MONGODB_URI.
  mongoUri: process.env.NODE_ENV === "development" && process.env.DEV_MONGODB_URI
    ? process.env.DEV_MONGODB_URI
    : process.env.MONGODB_URI || "",

  jwtSecret: process.env.JWT_SECRET || "development_secret",

  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "development_refresh_secret",

  aiApiKey: process.env.AI_API_KEY || "",

  nodeEnv: process.env.NODE_ENV || "development",
};

export default env;
