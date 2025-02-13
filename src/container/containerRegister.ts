import { container } from "tsyringe";
import UserRepositoryImpl from "../repository/userRepositoryImpl";
import { UserService } from "../service/userService";
import UserController from "../controller/userController";
import Database from "../database/database";

//  Database
container.registerSingleton("Database", Database);

//  Repositories
container.registerSingleton("UserRepository", UserRepositoryImpl);

//  Services
container.registerSingleton("UserService", UserService);

//  Controllers
container.registerSingleton("UserController", UserController);