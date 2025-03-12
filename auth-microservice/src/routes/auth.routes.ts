import { Router } from "express";
import {forgetPasswordController,  checkResetLink } from "../controller/auth.controller";
import { any } from "zod";
import { updatePassword } from "../repository/auth.repository";
const authRouter = Router();
authRouter.post("/auth/forgetPassword", forgetPasswordController)
authRouter.get("/auth/check-link/:u", checkResetLink)
authRouter.post("/auth/reset-password/:tokenId/:userId",updatePassword)
export default authRouter;