import mongoose from "mongoose";
import { getEnvValue } from "../libs/env.libs";


const connectMongoDB = async () => {
    const mongoUrl = getEnvValue('MONGO_URL') as string;
    const client = await mongoose.connect(mongoUrl)
    return client
}


export {
    connectMongoDB
}