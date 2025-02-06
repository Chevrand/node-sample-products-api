import { Router, Request, Response } from 'express';
import UserController from '../controller/userController';

const routes = Router();

//  Healthcheck
routes.get("/healthcheck", (req: Request, res: Response) => res.status(200).json({ message: "Server is up and running" }));

//  Users
UserController.configureRoutes(routes);

export default routes;