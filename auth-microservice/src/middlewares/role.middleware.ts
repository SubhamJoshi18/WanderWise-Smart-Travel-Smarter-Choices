import { Request,Response,NextFunction } from "express";
import { DatabaseExceptions } from "../exceptions";

async function isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const { role } = req.user;
        if (typeof role == "string" && role.toLowerCase().trim() === "admin") {
            next()
        }
        throw new DatabaseExceptions("Role doesnot match")
    }
    catch (err) {
        next(err);
    }
}
async function isUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { role } = req.user;
        if (typeof role == "string" && role.toLowerCase().trim() === "user") {
            next()
        }
        throw new DatabaseExceptions("Role doesnot match")
    }
    catch (err) {
        next(err);
    }
}async function isGuestUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { role } = req.user;
        if (typeof role == "string" && role.toLowerCase().trim() === "Guest") {
            next()
        }
        throw new DatabaseExceptions("Role doesnot match")
    }
    catch (err) {
        next(err);
    }
}
export {isAdmin,isUser,isGuestUser}