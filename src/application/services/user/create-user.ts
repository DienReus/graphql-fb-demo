import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../interfaces/user-repository.interface';
import { CreateUserInput } from 'src/application/dto/create-user.input';
import { User } from 'src/core/entities/user.entity';
@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: CreateUserInput): Promise<User> {
    return this.userRepository.create(input);
  }
}