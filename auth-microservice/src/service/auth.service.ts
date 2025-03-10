import { ISignupBody } from "../interface/auth.interface";
import { getEmail, saveData } from "../repository/auth.repo";
import bcrypt from "bcrypt";


async function signupService(body:ISignupBody){
    const{email,username,password}=body
    const senddetails= await getEmail(email)

    if(senddetails){
        throw new Error('Email exists')
    }

    const genSalt= await bcrypt.genSalt(10)
    const hashPassword= await bcrypt.hash(password,genSalt)

    const payload={
        email:email,
        username:username,
        password:hashPassword

    }

    const savedata= await saveData(payload)
    return savedata
    


}



export{
    signupService
}