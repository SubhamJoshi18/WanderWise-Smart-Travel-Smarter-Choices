import User from "../database/models/user.models";
import { ISignupBody } from "../interface/auth.interface";

async function getEmail(email:string){
    const res=await User.findOne({email:email})
    return res

}
async function saveData(data:ISignupBody){
    const res =await User.create({...data})
    return res
}

export{
    getEmail,
    saveData
}