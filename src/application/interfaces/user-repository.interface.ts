import { User } from "src/core/entities/user.entity";


export const IUserRepository = Symbol('IUserRepository');

export interface IUserRepository {
  create(user: Partial<User>): Promise<User>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}