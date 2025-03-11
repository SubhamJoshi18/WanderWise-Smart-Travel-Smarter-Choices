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
  const res = await UserProfile.updateOne(
    { _id: data },
    { isActive: false },
    { $new: true },
  );
  return res;
}
async function activateaccount(data: any) {
  const res = await UserProfile.updateOne(
    { _id: data },
    { isActive: true },
    { $new: true },
  );
  return res;
}
export { getEmail, saveData, deactivateaccount, activateaccount };
