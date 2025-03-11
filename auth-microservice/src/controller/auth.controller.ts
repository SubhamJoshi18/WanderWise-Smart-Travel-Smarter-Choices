import { Request ,Response,NextFunction} from "express";
import { wanderLogger } from "../libs/logger.libs";
import { forgetPasswordSchema, resetPasswordSchema } from "../validation/auth.validation";
import {forgetPasswordService, checkResetToken, resetPasswordServices } from "../services/auth.services";
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
        next(err)
    }
}
async function checkResetLink(req:Request,res:Response,next:NextFunction) {
            try{
                const tokenId = req.params.tokenId
                const apiResposne = await checkResetToken(tokenId)
                const contentMessage = `The Provided Token is Valid`
                
                return res.status(200).json({
                    response: apiResposne
                }) }catch(err){
                next(err)
        }
}
async function resetPassword(req:Request,res:Response,next:NextFunction){
        try{
            const tokenId = req.params.tokenId
            const userId = req.params.userId
            const content = await resetPasswordSchema.parseAsync(req.body)
            const apiResposne = await resetPasswordServices(tokenId,userId,content)
            const contentMessage = `The Provided Token is Valid`
            return res.status(200).json({
                response:apiResposne
            })
        }catch(err){
            next(err)
        }
    }

    
























export default forgetPasswordController