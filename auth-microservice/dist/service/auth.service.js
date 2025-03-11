var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getEmail, saveData } from "../repository/auth.repo";
import bcrypt from "bcrypt";
function signupService(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, username, password } = body;
        const senddetails = yield getEmail(email);
        if (senddetails) {
            throw new Error('Email exists');
        }
        const genSalt = yield bcrypt.genSalt(10);
        const hashPassword = yield bcrypt.hash(password, genSalt);
        const payload = {
            email: email,
            username: username,
            password: hashPassword
        };
        const savedata = yield saveData(payload);
        return savedata;
    });
}
export { signupService };
