import app from "./app.js";
import env from "./config/env.js";

const startServer = () => {
  app.listen(env.port, () => {
    console.log(`
========================================
        DEVFLOW BACKEND
========================================

Server:      http://localhost:${env.port}
Environment: ${env.nodeEnv}

Health API:
http://localhost:${env.port}/api/health

========================================
    `);
  });
};

startServer();
