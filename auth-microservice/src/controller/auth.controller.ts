import { NextFunction, Request, Response } from 'express';
import { loginService, signupService } from '../service/auth.service';
import { ISignupBody } from '../interface/auth.interface';
import {
  forgetPasswordSchema,
  resetPasswordSchema,
} from '../validation/auth.validation';
import {
  forgetPasswordService,
  resetPasswordServices,
  checkResetToken,
} from '../service/auth.service';
import { IforgetPasswordBody } from '../interface/auth.interface';

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

async function forgetPasswordController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const content = req.body;
    const parseBody = await forgetPasswordSchema.parseAsync(content);
    const apiResponse = await forgetPasswordService(
      parseBody as IforgetPasswordBody,
    );
    res.status(200).json({
      response: apiResponse,
    });
  } catch (err: any) {
    next(err);
  }
}
async function checkResetLink(req: Request, res: Response, next: NextFunction) {
  try {
    const tokenId = req.params.tokenId;
    const apiResposne = await checkResetToken(tokenId);
    const contentMessage = 'The Provided Token is Valid';

    res.status(200).json({
      response: apiResposne,
    });
  } catch (err) {
    next(err);
  }
}
async function resetPassword(req: Request, res: Response, next: NextFunction)  {
  try {
    const tokenId = req.params.tokenId;
    const userId = req.params.userId;
    const content = await resetPasswordSchema.parseAsync(req.body);
    const apiResposne = await resetPasswordServices(tokenId, userId, content);
    const contentMessage = 'The Provided Token is Valid';
    res.status(200).json({
      response: apiResposne,
    });
  } catch (err) {
    next(err);
  }
}

export {
  signupController,
  loginController,
  forgetPasswordController,
  checkResetLink,
  resetPassword,
};

export default forgetPasswordController;
