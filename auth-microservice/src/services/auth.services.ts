import Token from "../database/models/token.models"
import { string } from "zod";
import { v4 as uuidv4 } from "uuid";
import { IforgetPasswordBody } from "../interface/auth.interface";
import  findEmailRepo from "../repository/auth.repository";
import { isJsxOpeningFragment } from "typescript";
import { generateHtmlContent, subject } from "../constants/smtp";
import { sendEmail } from "../libs/smtp";

async function forgetPasswordService(parseBody:IforgetPasswordBody) {
    const { email } = parseBody;
    const findEmail:any = await findEmailRepo(email);
    if (!findEmail) {
        throw new Error("Email is not found")
    }
    let corelationIdAuth = uuidv4()
        
        const existToken = await Token.findOne({
            tokenUuid : corelationIdAuth
        })

    if (existToken) corelationIdAuth = uuidv4();

        const userId = findEmail._id
        const insertResult = await Token.create({
            tokenUuid : corelationIdAuth,
            user : userId
        })

        const url = `http://localhost:${process.env.PORT}/api/reset-password/${corelationIdAuth}/${userId}`
        const htmlContent = generateHtmlContent(url)
        const sendMail = await sendEmail(email,subject,`Password Reset Confirmation`,htmlContent)
        return {
            message : `The Password Reset link has sent successfully`
        }
}
    export default forgetPasswordService
