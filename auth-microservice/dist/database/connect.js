var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from 'mongoose';
import { getEnvValue } from '../libs/env.libs';
const connectMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongoUrl = getEnvValue('MONGO_URL');
    const client = yield mongoose.connect(mongoUrl);
    return client;
});
export { connectMongoDB };
