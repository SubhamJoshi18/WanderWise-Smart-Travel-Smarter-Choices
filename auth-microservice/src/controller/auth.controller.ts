import { NextFunction, Request, Response } from 'express';
import {
  activateService,
  deactivateService,
  loginService,
  signupService,
} from '../service/auth.service';
import { ISignupBody } from '../interface/auth.interface';

async function signupController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body = req.body;
    const apiResponse = await signupService(body as ISignupBody);
    res.status(201).json({
      message: 'Signup Completed',
      data: apiResponse,
    });
  } catch (err: any) {
    next(err);
  }
}

async function loginController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body = req.body;
    const apiResponse = await loginService(body);
    res.status(201).json({
      message: 'Login Completed',
      data: apiResponse,
    });
  } catch (err) {
    next(err);
  }
}
async function deactivateController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body = req.user.id;
    const getuserbyid = await deactivateService(body);
    res.status(201).json({
      message: 'Account deactivated',
      account: getuserbyid,
    });
  } catch (err) {
    next(err);
  }
}
async function activateController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body = req.user.id;
    const getuserbyid = await activateService(body);
    res.status(201).json({
      message: 'Account reactivated',
      account: getuserbyid,
    });
  } catch (err) {
    next(err);
  }
}
export {
  signupController,
  loginController,
  deactivateController,
  activateController,
};
