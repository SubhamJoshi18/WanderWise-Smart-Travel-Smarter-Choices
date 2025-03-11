import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { wanderLogger } from './logger.libs';

dotenv.config();

export const sendEmail = async (to : string, subject : string, text : string, html : string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 456,
    secure: true,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  const methodOptions = {
    from: {
      name: '',
      address: process.env.APP_EMAIL,
    },
    to,
    subject,
    text,
    html,
  };

  return transporter
    .sendMail(methodOptions as unknown as any)
    .then((res  : any) => {
      wanderLogger.info('Success');
    })
    .catch((err : any) => {
      wanderLogger.error(err);
    });
};
