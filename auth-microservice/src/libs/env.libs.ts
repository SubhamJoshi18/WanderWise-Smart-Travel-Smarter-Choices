import dotenv from 'dotenv'
dotenv.config()



const getEnvValue = (key : string) : string => {
    return process.env[key];
}



export {
    getEnvValue
}
