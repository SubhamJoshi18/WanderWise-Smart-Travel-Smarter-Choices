import { Request ,Response,NextFunction} from "express";
import { wanderLogger } from "../libs/logger.libs";
import { forgetPasswordSchema } from "../validation/auth.validation";
import forgetPasswordService from "../services/auth.services";
import { IforgetPasswordBody } from "../interface/auth.interface";

async function forgetPasswordController(req:Request, res:Response, next:NextFunction) {
    try {
        const content = req.body;
        const parseBody = await forgetPasswordSchema.parseAsync(content);
        const apiResponse=await forgetPasswordService(parseBody as IforgetPasswordBody)
        return res.status(200).json({
            response:apiResponse
        })}
    catch (err: any) {
        wanderLogger.error("Error in forgetting password")
    }
}
























export default forgetPasswordController