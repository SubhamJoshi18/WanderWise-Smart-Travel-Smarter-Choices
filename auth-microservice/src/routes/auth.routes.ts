import {Router} from "express";
import { signupController } from "../controller/auth.controller";

const authRouter=Router();

authRouter.post('/auth/signup',signupController);

export{
    
}


