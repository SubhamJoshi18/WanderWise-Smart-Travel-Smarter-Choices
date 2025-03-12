import { getEnvValue } from '../libs/env.libs';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

async function checkToken(req: Request, res: Response, next: NextFunction) {
  const readToken = req.headers.authorization;
  if (!readToken) {
    throw new Error('No token available');
  } else {
    const secretkey = getEnvValue('SECRETS') as string;
    const payload = jwt.verify(readToken, secretkey);
    req.user = payload
    next();
  }
}
export { checkToken };