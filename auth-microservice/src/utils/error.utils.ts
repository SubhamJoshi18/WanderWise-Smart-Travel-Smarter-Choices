import { NextFunction, Request, Response } from 'express';
import { AppError } from '../exceptions';
import statusCode from 'http-status-codes';

function notFoundHandler(req: Request, res: Response) {
  return res.status(404).json({
    message: `The ${req.originalUrl} Url Does not Exists on our System`,
  });
}

function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.getStatusCode()).json({
      message: err.getMessage(),
      data: null,
      error: true,
      trace: err.stack,
      name: err.name,
    });
  }

  return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
    message: err.message,
    data: null,
    error: true,
    trace: err.stack,
    name: err.name,
  });
}

export { notFoundHandler, globalErrorHandler };
