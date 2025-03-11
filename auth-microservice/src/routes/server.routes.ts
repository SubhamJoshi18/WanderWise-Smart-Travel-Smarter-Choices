import { Application } from 'express';
import healthRouter from './health.routes';
import { globalErrorHandler, notFoundHandler } from '../utils/error.utils';
import authRouter from './auth.routes';

const serverRouter = (app: Application) => {

  app.use('/api', [healthRouter, authRouter]);
  app.use('*', notFoundHandler as any);
  app.use(globalErrorHandler as any);


};

export { serverRouter };
