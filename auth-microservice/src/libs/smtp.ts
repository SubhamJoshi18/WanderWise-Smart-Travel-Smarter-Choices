import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { wanderLogger } from './logger.libs';
import { getEnvValue } from './env.libs';

dotenv.config();

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html: string,
) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 456,
    secure: true,
    auth: {
      user: getEnvValue('APP_EMAIL') as string,
      pass: getEnvValue('APP_PASSWORD') as string,
    },
  });

  const methodOptions = {
    from: {
      name: '',
      address: getEnvValue('APP_EMAIL') as string,
    },
    to,
    subject,
    text,
    html,
  };

  return transporter
    .sendMail(methodOptions as unknown as any)
    .then((res: any) => {
      wanderLogger.info('Success');
    })
    .catch((err: any) => {
      wanderLogger.error(err);
    });
};
