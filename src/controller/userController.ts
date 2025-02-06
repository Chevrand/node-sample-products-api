import { container, inject, singleton } from "tsyringe";
import { UserService } from "../service/userService";
import { Router, Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

@singleton()
class UserController {

    constructor(
        @inject(UserService) private readonly userService: UserService
    ) {}

    async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const users = await this.userService.getAllUsers();
        return res.status(200).json(users);        
    }

    async getUserById(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const user = await this.userService.getUserById(Number(req.params.id));
        return res.status(200).json(user);
    }

    async createUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const id = await this.userService.createUser(req.body);
        return res.status(201).json(id);
    }

    async updateUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const id = await this.userService.updateUser(Number(req.params.id), req.body);
        return res.status(200).json(id);
    }

    async activateOrDeactivateUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
        await this.userService.activateOrDeactivateUser(Number(req.params.id), Boolean(req.query.active));
        return res.sendStatus(204);
    }

    static configureRoutes(router: Router): void {
        const controller = container.resolve(UserController);
        const domain = "/users";

        router.get(domain, (req: Request, res: Response, next: NextFunction) => controller.getAllUsers(req, res, next));
        router.get(`${domain}/:id`, (req: Request, res: Response, next: NextFunction) => controller.getAllUsers(req, res, next));
        router.post(domain, (req: Request, res: Response, next: NextFunction) => controller.createUser(req, res, next));
        router.put(`${domain}/:id`, (req: Request, res: Response, next: NextFunction) => controller.updateUser(req, res, next));
        router.patch(`${domain}/:id`, (req: Request, res: Response, next: NextFunction) => controller.activateOrDeactivateUser(req, res, next));
    }
}

export default UserController;