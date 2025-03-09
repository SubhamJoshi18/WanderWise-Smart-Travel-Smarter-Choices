import { Application } from 'express';
import healthRouter from './health.routes';

const serverRouter = (app: Application) => {
  app.use('/api', [healthRouter]);
};

export { serverRouter };
