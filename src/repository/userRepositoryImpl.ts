import { inject, singleton } from 'tsyringe';
import postgres from 'postgres';
import Database from '../database/database';
import UserRepository from './userRepository';
import { UserDTO } from '../types/UserDTO';
import { UserPostDTO } from '../types/UserPostDTO';
import logger from '../utils/logger';

@singleton()
class UserRepositoryImpl implements UserRepository {

    private sql: ReturnType<typeof postgres>;

    constructor(
        @inject(Database) private readonly database: Database
    ) {
        this.sql = database.getConnection();
    }

    async getAllUsers(): Promise<UserDTO[]> {
        return await this.sql<UserDTO[]>`
            SELECT
                id,
                name,
                email,
                created_at as "createdAt",
                updated_at as "updatedAt"
            FROM users
        `;
    }

    async getUserById(id: number): Promise<UserDTO> {
        const users = await this.sql<UserDTO[]>`
            SELECT
                id,
                name,
                email,
                created_at as "createdAt",
                updated_at as "updatedAt"
            FROM users WHERE id = ${id}
        `;

        if (!users.length) throw new Error('User not found'); 

        return users[0];
    }

    async createUser(dto: UserPostDTO): Promise<number> {
        const users = await this.sql<UserDTO[]>`
            INSERT INTO users (name, email, password, created_at, updated_at)
            VALUES (${dto.name}, ${dto.email}, ${dto.password}, NOW(), NOW()) RETURNING *
        `;

        return users[0].id;
    }

    async updateUser(id: number, dto: UserPostDTO): Promise<number> {
        const users = await this.sql<UserDTO[]>`
            UPDATE users SET name = ${dto.name}, email = ${dto.email}, updated_at = NOW()
            WHERE id = ${id} RETURNING *
        `;

        return users[0].id;
    }

    async deleteUser(id: number) {
        return await this.sql`DELETE FROM users WHERE id = ${id}`;
    }
}

export default UserRepositoryImpl;