var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../database/models/user.models";
function getEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield User.findOne({ email: email });
        return res;
    });
}
function saveData(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield User.create(Object.assign({}, data));
        return res;
    });
}
export { getEmail, saveData };
