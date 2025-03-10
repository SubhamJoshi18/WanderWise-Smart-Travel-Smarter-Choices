import User from "../database/models/user.models";
import { IforgetPasswordBody } from "../interface/auth.interface";
async function findEmailRepo(email) {
    
    
    const result = await User.find({ email: email })








    return result;
}
export default findEmailRepo;