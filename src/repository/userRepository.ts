import { UserDTO } from "../types/UserDTO";
import { UserPostDTO } from "../types/UserPostDTO";

export default interface UserRepository {
    getAllUsers(): Promise<UserDTO[]>;
    getUserById(id: number): Promise<UserDTO>;
    createUser(dto: UserPostDTO): Promise<number>;
    updateUser(id: number, dto: UserPostDTO): Promise<number>;
    activateOrDeactivateUser(id: number, active: boolean): Promise<void>;
}