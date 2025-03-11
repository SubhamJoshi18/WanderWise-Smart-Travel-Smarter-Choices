import Token from "../database/models/token.models"
import BcryptHelper from "../libs/bcrypt"
import { v4 as uuidv4 } from "uuid";
import { IforgetPasswordBody } from "../interface/auth.interface";
import {findEmailRepo, findCorrelationIdAuth, createToken, findToken, findUser, updatePassword} from "../repository/auth.repository";
import { isJsxOpeningFragment } from "typescript";
import { generateHtmlContent, subject } from "../constants/smtp";
import { sendEmail } from "../libs/smtp";
import bcrypt from "../libs/bcrypt";
import { object } from "zod";


export async function forgetPasswordService(parseBody:IforgetPasswordBody) {
    const { email } = parseBody;
    const findEmail:any = await findEmailRepo(email);
    if (!findEmail) {
        throw new Error("Email is not found")
    }
    let corelationIdAuth = uuidv4()
        
    const existToken = await findCorrelationIdAuth(corelationIdAuth);
   

    if (existToken) corelationIdAuth = uuidv4();

        const userId = findEmail._id
        const insertResult=await createToken(corelationIdAuth,userId)

        const url = `http://localhost:${process.env.PORT}/api/reset-password/${corelationIdAuth}/${userId}`
        const htmlContent = generateHtmlContent(url)
        const sendMail = await sendEmail(email,subject,`Password Reset Confirmation`,htmlContent)
        return {
            message : `The Password Reset link has sent successfully`
        }
}
export async function checkResetToken(tokenId:string) {
    const tokenExists=await findToken(tokenId)
        if(!tokenExists) throw new DatabaseExceptions(`The Token Does not Exists or it is already Expired`)
        return tokenExists
}

export async function resetPasswordServices(tokenId:string, userId:string, content:object) {
        const {password}:any = content
       const userDoc=await findUser(userId)

    if (!userDoc) throw new DatabaseExceptions(`The User Does not Exists on the System`, statusCode.BAD_REQUEST);
    const tokenExists=await findToken(tokenId)
        if(!tokenExists) throw new DatabaseExceptions(`The Token Does not Exists or The Token is already Expired`,statusCode.BAD_GATEWAY)
    const hashNewPassword =
        
        BcryptHelper.hashPassword(password)
        const oldPassword = userDoc.password
        const isSamePassword = BcryptHelper.comparePassword(password,oldPassword)
        if(isSamePassword){
            throw new DatabaseExceptions(`The Password you have entered matches with your old Passowrd, Try a new one`,statusCode.BAD_GATEWAY)
    }
    

    



    const updatedResult=await updatePassword(userDoc,userId,hashNewPassword)
        const validUpdated = updatedResult.acknowledged && updatedResult.matchedCount > 0;
        return validUpdated ? 
        {
            data : updatedResult,
            message : `The Password has been Reset`
        }:
        {
            data : null,
            message : `There is some issue while updating the new password`
        }
    }
    
