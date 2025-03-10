var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { getEnvValue } from './libs/env.libs';
import { wanderLogger } from './libs/logger.libs';
import { serverRouter } from './routes/server.routes';
import { serverMiddleware } from './middlewares/server.middleware';
import { connectMongoDB } from './database/connect';
const port = getEnvValue('PORT');
const app = express();
function startExpressApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Promise.all([serverMiddleware(app), serverRouter(app)]);
            connectMongoDB().then((connection) => {
                wanderLogger.info(`Database is Connected , DB Name : ${connection.connection.name}`);
                app.listen(port, () => {
                    wanderLogger.info(`Auth Microservice is running on ${port}`);
                });
            });
        }
        catch (err) {
            wanderLogger.error('There is an Error while starting the Express Server For Auth Microservice');
            process.exit(0);
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield startExpressApp();
}))();
