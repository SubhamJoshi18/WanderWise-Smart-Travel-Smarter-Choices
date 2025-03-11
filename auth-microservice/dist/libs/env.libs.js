import dotenv from 'dotenv';
dotenv.config();
const getEnvValue = (key) => {
    return process.env[key];
};
export { getEnvValue };
