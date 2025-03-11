import { Types } from 'mongoose';
import { DatabaseExceptions } from '../exceptions';
import { ILoginBody, ISignupBody } from '../interface/auth.interface';
import { getEnvValue } from '../libs/env.libs';
import {
  activateaccount,
  deactivateaccount,
  getEmail,
  saveData,
  saveUserProfileData,
  updatedUserProfile,
} from '../repository/auth.repo';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function signupService(body: ISignupBody) {
  const { email, username, password } = body;
  const senddetails = await getEmail(email);

  if (senddetails) {
    throw new DatabaseExceptions('Email exists');
  }

  const genSalt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, genSalt);

  const payload = {
    email: email,
    username: username,
    password: hashPassword,
  };

  const savedata = await saveData(payload);
  const savedDataId = savedata._id
  const saveUserProfile = await saveUserProfileData(savedDataId as unknown as string)
  const userProfileUpdated = await updatedUserProfile(savedDataId as unknown as string,saveUserProfile._id as unknown as string)
  return {
    user : saveData,
    userProfile : saveUserProfile
  }
}
async function loginService(body: ILoginBody) {
  const { email, password } = body;
  const getemail = await getEmail(email);

  if (!getemail) {
    throw new DatabaseExceptions('No existing email');
  }

  const dbpassword = getemail.password;
  const comparepassword = await bcrypt.compare(password, dbpassword);

  if (!comparepassword) {
    throw new DatabaseExceptions('Wrong password');
  }
  const payload = {
    id: getemail._id,
    email: getemail.email,
    password: getemail.password,
  };

  const secretkey = getEnvValue('SECRETS') as string;

  const options: jwt.SignOptions = {
    issuer: 'Subham raj joshi',
    expiresIn: '1h',
  };

  const accesstoken = jwt.sign(payload, secretkey, options);
  return accesstoken;
}
async function deactivateService(body: any) {
  const deactivate = await deactivateaccount(body);
  return deactivate;
}
async function activateService(body: any) {
  const deactivate = await activateaccount(body);
  return deactivate;
}

export { signupService, loginService, deactivateService, activateService };
