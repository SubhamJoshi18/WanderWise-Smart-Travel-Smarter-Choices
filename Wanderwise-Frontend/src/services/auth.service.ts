import axios from "axios";
import {
  FORGET_PASSWORD_API,
  LOGIN_API,
  RESET_PASSWORD_API,
  SIGNUP_API,
} from "../constants/auth.constant";
import { ILoginBody, ISignupBody } from "../interface/auth.interface";

async function SignUpUser(payload: ISignupBody) {
  try {
    const response = await axios.post(SIGNUP_API, { ...payload });
    const data = response.data;
    return data;
  } catch (err) {
    console.error(`Error while hitting the API :  ${SIGNUP_API}`);
  }
}

async function LoginUser(payload: ILoginBody) {
  try {
    const response = await axios.post(LOGIN_API, { ...payload });
    const data = response.data;
    return data;
  } catch (err) {
    console.error(`Error while hitting the API :  ${LOGIN_API}`);
  }
}

async function ForgetPassword(payload: { email: string }) {
  try {
    const response = await axios.post(FORGET_PASSWORD_API, { ...payload });
    const data = response.data;
    return data;
  } catch (err) {
    console.error(`Error while hitting the API :  ${FORGET_PASSWORD_API}`);
  }
}

async function ResetPasswordApi(
  payload: { password: string },
  coRelationId: string,
  userId: string
) {
  try {
    const response = await axios.post(
      `${RESET_PASSWORD_API}/${coRelationId}/${userId}`,
      { ...payload }
    );
    const data = response.data;
    return data;
  } catch (err) {
    console.error(`Error while hitting the API :  ${RESET_PASSWORD_API}`);
  }
}

export { SignUpUser, LoginUser, ForgetPassword, ResetPasswordApi };
