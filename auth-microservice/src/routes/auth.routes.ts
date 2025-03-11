import { Router } from 'express';
import {
  activateController,
  deactivateController,
  loginController,
  signupController,
} from '../controller/auth.controller';
import {
  validateloginBody,
  validatesignupBody,
} from '../middlewares/validation.middleware';
import { checkToken } from '../middlewares/token.middleware';

const authRouter = Router();

authRouter.post('/auth/signup', validatesignupBody, signupController);
authRouter.post('/auth/login', validateloginBody, loginController);
authRouter.post('/auth/deactivate', checkToken, deactivateController);
authRouter.post('/auth/activate', checkToken, activateController);

export default authRouter;
