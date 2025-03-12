import express from 'express';
import { getEnvValue } from './libs/env.libs';
import { wanderLogger } from './libs/logger.libs';
import { serverRouter } from './routes/server.routes';
import { serverMiddleware } from './middlewares/server.middleware';
import { connectMongoDB } from './database/connect';
import mongoose from 'mongoose';

const port = getEnvValue('PORT');
const app = express();

async function startExpressApp() {
  try {
    await Promise.all([serverMiddleware(app), serverRouter(app)]);
    connectMongoDB().then((connection: typeof mongoose) => {
      wanderLogger.info(
        `Database is Connected , DB Name : ${connection.connection.name}`,
      );
      app.listen(port, () => {
        wanderLogger.info(`Auth Microservice is running on ${port}`);
      });
    });
  } catch (err) {
    wanderLogger.error(
      'There is an Error while starting the Express Server For Auth Microservice',
    );

    process.exit(0);
  }
}

(async () => {
  await startExpressApp();
})();
