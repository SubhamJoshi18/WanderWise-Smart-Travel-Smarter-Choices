import healthRouter from './health.routes';
const serverRouter = (app) => {
    app.use('/api', [healthRouter]);
};
export { serverRouter };
