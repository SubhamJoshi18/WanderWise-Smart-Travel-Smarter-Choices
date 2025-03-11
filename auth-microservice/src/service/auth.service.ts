import { DatabaseExceptions } from '../exceptions';
import { ILoginBody, ISignupBody } from '../interface/auth.interface';
import { getEnvValue } from '../libs/env.libs';
import {
  createToken,
  findCorrelationIdAuth,
  findEmailRepo,
  findToken,
  findUser,
  getEmail,
  saveData,
  updatePassword,
} from '../repository/auth.repo';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IforgetPasswordBody } from '../interface/auth.interface';
import { v4 as uuidv4 } from 'uuid';
import { generateHtmlContent } from '../constants/smtp';
import { sendEmail } from '../libs/smtp';
import BcryptHelper from '../libs/bcrypt';
import statusCodes from 'http-status-codes';

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
  return savedata;
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
    email: getemail.email,
    username: getemail.username,
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

async function forgetPasswordService(parseBody: IforgetPasswordBody) {
  const { email } = parseBody;
  const findEmail: any = await findEmailRepo(email);
  if (!findEmail) {
    throw new Error('Email is not found');
  }
  let corelationIdAuth = uuidv4();

  const existToken = await findCorrelationIdAuth(corelationIdAuth);

  if (existToken) {
    corelationIdAuth = uuidv4();
  }

  const userId = findEmail._id;
  const insertResult = await createToken(corelationIdAuth, userId);

  const url = `http://localhost:${getEnvValue('PORT')}/api/reset-password/${corelationIdAuth}/${userId}`;
  const htmlContent = generateHtmlContent(url);
  const subject = 'Password Reset';
  const sendMail = await sendEmail(
    email,
    subject,
    'Password Reset Confirmation',
    htmlContent,
  );
  return {
    message: 'The Password Reset link has sent successfully',
  };
}
async function checkResetToken(tokenId: string) {
  const tokenExists = await findToken(tokenId);
  if (!tokenExists) {
    throw new DatabaseExceptions(
      `The Token Does not Exists or it is already Expired`,
    );
  }
  return tokenExists;
}

async function resetPasswordServices(
  tokenId: string,
  userId: string,
  content: object,
) {
  const { password }: any = content;
  const userDoc = await findUser(userId);

  if (!userDoc)
    throw new DatabaseExceptions(
      `The User Does not Exists on the System`,
      statusCodes.BAD_REQUEST,
    );
  const tokenExists = await findToken(tokenId);
  if (!tokenExists) {
    throw new DatabaseExceptions(
      `The Token Does not Exists or The Token is already Expired`,
      statusCodes.BAD_GATEWAY,
    );
  }
  const hashNewPassword = await BcryptHelper.hashPassword(password);
  const oldPassword = userDoc.password;
  const isSamePassword = await BcryptHelper.comparePassword(
    password,
    oldPassword,
  );
  if (isSamePassword) {
    throw new DatabaseExceptions(
      'The Password you have entered matches with your old Passowrd, Try a new one',
      statusCodes.BAD_GATEWAY,
    );
  }

  const updatedResult = await updatePassword(userDoc, userId, hashNewPassword);
  const validUpdated =
    updatedResult.acknowledged && updatedResult.matchedCount > 0;
  return validUpdated
    ? {
        data: updatedResult,
        message: 'The Password has been Reset',
      }
    : {
        data: null,
        message: 'There is some issue while updating the new password',
      };
}

export { signupService, loginService , forgetPasswordService, checkResetToken,resetPasswordServices};
