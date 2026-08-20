import mongoose from "mongoose";
import env from "./env.js";

const connectionState = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting",
};

export const getDatabaseStatus = () => connectionState[mongoose.connection.readyState];

const connectDatabase = async () => {
  if (!env.mongoUri) {
    console.warn("MongoDB is not configured; the API will run without database features.");
    return null;
  }

  try {
    const connection = await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    console.warn("The API will remain available while MongoDB is disconnected.");
    return null;
  }
};

export default connectDatabase;
