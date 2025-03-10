import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { wanderLogger } from './logger.libs';

dotenv.config()


export const sendEmail = async (
    to,
    subject,
    text,
    html
  ) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 456,
      secure: true,
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });
  
    let methodOptions = {
      from: {
        name: "",
        address: process.env.APP_EMAIL,
      },
      to,
      subject,
      text,
      html,
    };
  
    return transporter
      .sendMail(methodOptions)
      .then((res) => {
       wanderLogger.info("Success")
      })
      .catch((err) => {
        wanderLogger.error(err)
      });
  };