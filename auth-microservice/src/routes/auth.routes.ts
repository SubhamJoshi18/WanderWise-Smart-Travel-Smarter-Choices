import { Router } from "express";
import forgetPasswordController from "../controller/auth.controller";
const authRouter = Router();
authRouter.post("/auth/forgetPassword", forgetPasswordController as any)
export default authRouter;