import { ISignupBody } from "../interface/auth.interface";
import {  getEmail, saveData } from "../repository/auth.repo";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'


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
async function loginService(body:ISignupBody){
    const {email,password}= body;
    const getemail= await getEmail(email)

    if(!getemail){
        throw new Error('No existing email')
    }

    const dbpassword= getemail.password
    const comparepassword= await bcrypt.compare(password,dbpassword)

    if(!comparepassword){
        throw new Error('Wrong password')
    }
    const payload={
        email:getemail.email,
        username:getemail.username,
        password:getemail.password
    }


    const secretkey='sujal'

    const accesstoken= jwt.sign(payload,secretkey,{issuer:'Subham raj joshi',expires_in:'1h'} as any)
    return accesstoken




}



export{
    signupService,
    loginService
}