import User from '../database/models/user.models';
import Token from '../database/models/token.models';
import { ISignupBody } from '../interface/auth.interface';
import UserProfile from '../database/models/userProfile.models';

async function getEmail(email: string) {
  const res = await User.findOne({ email: email });
  return res;
}
async function saveData(data: ISignupBody) {
  const res = await User.create({ ...data });
  return res;
}

export async function findEmailRepo(email: string) {
  const result = await User.findOne({ email: email });

  return result;
}

export async function findCorrelationIdAuth(corelationIdAuth: string) {
  const existToken = await Token.findOne({
    tokenUuid: corelationIdAuth,
  });
  return existToken;
}
export async function createToken(corelationIdAuth: string, userId: string) {
  const insertResult = await Token.create({
    tokenUuid: corelationIdAuth,
    user: userId,
  });
  return insertResult;
}

export async function findToken(tokenId: string) {
  const tokenExists = await Token.findOne({ tokenUuid: tokenId });

  return tokenExists;
}
export async function findUser(userId: string) {
  const user = User.findOne({ _id: userId });
  return user;
}
export async function updatePassword(
  userDoc: any,
  userId: string,
  hashNewPassword: string,
) {
  const updatedResult = await User.updateOne(
    {
      _id: userDoc._id ?? userId,
    },
    {
      password: hashNewPassword,
    },
    {
      $new: true,
    },
  );
  return updatedResult;
}

export async function createUserProfile(userId: any) {
  const result = await UserProfile.create({
    user: userId,
  });
  return result;
}

export async function updateUserProfile(userId: any, userProfileId: any) {
  const result = await User.updateOne(
    {
      _id: userId,
    },
    {
      userProfile: userId,
    },
    {
      $new: true,
    },
  );
  return result;
}

export { getEmail, saveData };
