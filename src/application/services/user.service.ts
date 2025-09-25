import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: IUserRepository) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepo.findAll();
  }

  getUserById(id: number): Promise<User | null> {
    return this.userRepo.findById(id);
  }

  createUser(name: string): Promise<User> {
    const user = new User();
    user.name = name;
    return this.userRepo.save(user);
  }
}
