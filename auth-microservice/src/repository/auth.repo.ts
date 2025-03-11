import User from '../database/models/user.models';
import UserProfile from '../database/models/userProfile.models';
import { ISignupBody } from '../interface/auth.interface';

async function getEmail(email: string) {
  const res = await User.findOne({ email: email });
  return res;
}
async function saveData(data: ISignupBody) {
  const res = await User.create({ ...data });
  return res;
}
async function deactivateaccount(data: any) {
  const res = await User.updateOne(
    { _id: data },
    { isActive: false },
    { $new: true },
  );
  return res;
}
async function activateaccount(data: any) {
  const res = await User.updateOne(
    { _id: data },
    { isActive: true },
    { $new: true },
  );
  return res;
}

async function saveUserProfileData(userId:string) {
  const res = await UserProfile.create(
    {user : userId}
  )
  return res
}

async function updatedUserProfile(userId:string,saveId:string){
  const res = await User.updateOne(
    {
      _id : userId
    },
    {
      userProfile : saveId
    },
    {
      $new : true
    }
  )
  return res
}
export { getEmail, saveData, deactivateaccount, activateaccount ,saveUserProfileData,updatedUserProfile};
