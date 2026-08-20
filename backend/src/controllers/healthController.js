import { getDatabaseStatus } from "../config/database.js";

const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: "DevFlow API is running",
    data: {
      service: "DevFlow Backend",
      status: "healthy",
      database: getDatabaseStatus(),
      environment: process.env.NODE_ENV || "development",
      timestamp: new Date().toISOString(),
    },
  });
};

export default {
  getHealth,
};
