
import { Request,Response } from "express"
import { signupService } from "../service/auth.service";
import { ISignupBody } from "../interface/auth.interface";


async function signupController(req:Request,res:Response){
    try{
        const body = req.body;
        const apiResponse= await signupService(body as ISignupBody);
        res.status(201).json({
            message:'Signup Completed'
        })

    }
    catch(err:any){
        throw new Error(err);


    }
}
export{
    signupController
}