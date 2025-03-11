import { Router } from 'express';
import {
  loginController,
  signupController,
} from '../controller/auth.controller';

const authRouter = Router();

authRouter.post('/auth/signup', signupController);
authRouter.post('/auth/login', loginController);

export default authRouter
