import { Request,Response,NextFunction } from "express"
import { loginSchema, signupSchema } from "../validation/auth.validation"
async function validatesignupBody(req:Request, res:Response, next:NextFunction){
    try{
        const parseContent=await signupSchema.parseAsync(req.body)
        next()

    }
    catch(err){
        next(err)

    }
}
async function validateloginBody(req:Request, res:Response, next:NextFunction){
    try{
        const parseContent=await loginSchema.parseAsync(req.body)
        next()

    }
    catch(err){
        next(err)

    }
}

export{
    validateloginBody,
    validatesignupBody
}