import { Router } from 'express';
import forgetPasswordController, {
  checkResetLink,
  loginController,
  resetPassword,
  signupController,
} from '../controller/auth.controller';

const authRouter = Router();

authRouter.post('/auth/signup', signupController);
authRouter.post('/auth/login', loginController);
authRouter.post('/auth/forgetPassword', forgetPasswordController);
authRouter.post('/auth/checkPassword', checkResetLink);
authRouter.post('/auth/resetPassword', resetPassword);

export default authRouter;
