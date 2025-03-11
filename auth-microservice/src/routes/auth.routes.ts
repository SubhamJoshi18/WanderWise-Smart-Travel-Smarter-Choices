<<<<<<< HEAD
=======
<<<<<<< HEAD
import { Router } from 'express';
import {
  loginController,
  signupController,
} from '../controller/auth.controller';

const authRouter = Router();

authRouter.post('/auth/signup', signupController);
authRouter.post('/auth/login', loginController);

export default authRouter
=======
>>>>>>> release-tn-sprint-1
import {Router} from "express";
import { loginController, signupController } from "../controller/auth.controller";

const authRouter=Router();

authRouter.post('/auth/signup',signupController);
authRouter.post('/auth/login',loginController);
authRouter.post('/auth/deactivate',deactivateController)


export default authRouter


<<<<<<< HEAD
=======
>>>>>>> 57c8667 (deactivation-activation)
>>>>>>> release-tn-sprint-1
