import 'reflect-metadata';
import './container/containerRegister.ts';
import express from 'express';
import config from './config/default';
import logger from './utils/logger'
import routes from './router/routerController';

const port = config.port;
const app = express();

app.use(express.json());
app.use("/api/", routes);

app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}`);
});