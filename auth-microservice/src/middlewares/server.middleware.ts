import { Application } from 'express';
import express from 'express';
import morgan from 'morgan';

const serverMiddleware = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
};

export { serverMiddleware };
