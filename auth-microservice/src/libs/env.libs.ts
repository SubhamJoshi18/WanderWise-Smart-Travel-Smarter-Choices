import dotenv from 'dotenv';
dotenv.config();

const getEnvValue = (key: string): string | undefined => {
  return process.env[key];
};

export { getEnvValue };
