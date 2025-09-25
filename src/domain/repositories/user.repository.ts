import { User } from '../entities/user.entity';

export abstract class IUserRepository {
  abstract findAll(): Promise<User[]>;
  abstract findById(id: number): Promise<User | null>;
  abstract save(user: User): Promise<User>;
}