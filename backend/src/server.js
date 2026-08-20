import app from "./app.js";
import mongoose from "mongoose";
import env from "./config/env.js";
import connectDatabase from "./config/database.js";

const startServer = async () => {
  const server = app.listen(env.port, () => {
    console.log(`
========================================
        DEVFLOW BACKEND
========================================

Server:      http://localhost:${env.port}
Environment: ${env.nodeEnv}

Health API:
http://localhost:${env.port}/api/health

Database:    Connecting in background

========================================
      `);
  });

  await connectDatabase();

  const closeServer = async (signal) => {
    console.log(`\n${signal} received. Shutting down DevFlow API...`);

    server.close(async () => {
      await mongoose.disconnect();
      process.exit(0);
    });
  };

  process.once("SIGINT", () => closeServer("SIGINT"));
  process.once("SIGTERM", () => closeServer("SIGTERM"));
};

startServer();
