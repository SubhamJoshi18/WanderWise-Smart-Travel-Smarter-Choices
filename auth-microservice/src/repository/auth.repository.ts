import User from '../database/models/user.models';
import { IforgetPasswordBody } from '../interface/auth.interface';
import Token from '../database/models/token.models';

export async function findEmailRepo(email: string) {
  const result = await User.find({ email: email });

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
