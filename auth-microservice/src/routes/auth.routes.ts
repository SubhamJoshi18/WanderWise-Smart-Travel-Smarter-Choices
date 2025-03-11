import { Router } from "express";
import forgetPasswordController, { checkResetLink } from "../controller/auth.controller";
const authRouter = Router();

authRouter.post("/auth/forgetPassword", forgetPasswordController as any)
authRouter.post('/auth/checkPassword',checkResetLink as any)
authRouter.post('/auth/resetPassword', checkResetLink as any)

export default authRouter;