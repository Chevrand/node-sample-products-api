import { inject, injectable, singleton } from "tsyringe";
import UserRepository from "../repository/userRepository";
import { UserPostDTO } from "../types/UserPostDTO";
import { UserDTO } from "../types/UserDTO";

@singleton()
export class UserService {
    constructor(
        @inject("UserRepository") private readonly userRepository: UserRepository
    ) {}

    async getAllUsers(): Promise<UserDTO[]> {
        return await this.userRepository.getAllUsers();
    }

    async getUserById(id: number): Promise<UserDTO> {
        return await this.userRepository.getUserById(id);
    }

    async createUser(dto: UserPostDTO): Promise<number> {
        return await this.userRepository.createUser(dto);
    }

    async updateUser(id: number, dto: UserPostDTO): Promise<number> {
        return await this.userRepository.updateUser(id, dto);
    }
}