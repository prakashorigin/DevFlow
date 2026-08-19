import dotenv from "dotenv";

dotenv.config();

const env = {
  port: process.env.PORT || 6001,

  clientUrl: process.env.CLIENT_URL || "http://localhost:4001",

  mongoUri: process.env.MONGODB_URI || "",

  jwtSecret: process.env.JWT_SECRET || "development_secret",

  aiApiKey: process.env.AI_API_KEY || "",

  nodeEnv: process.env.NODE_ENV || "development",
};

export default env;
