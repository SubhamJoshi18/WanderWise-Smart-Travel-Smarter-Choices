import { Router } from 'express';
const healthRouter = Router();
healthRouter.get('/health', (req, res) => {
    res.status(201).json({
        message: `${req.originalUrl} is Working Fine`,
        status: true,
        time: new Date().toDateString(),
    });
});
export default healthRouter;
