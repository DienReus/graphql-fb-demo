import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from '../../adapters/graphql/user.resolver';
import { IUserRepository } from '../../application/interfaces/user-repository.interface';
import { TypeOrmUserRepository } from '../database/repositories/typeorm-user.repository';
import { User } from 'src/core/entities/user.entity';
import { CreateUserUseCase } from 'src/application/services/user/create-user';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserResolver,
    CreateUserUseCase,
    {
      provide: IUserRepository,
      useClass: TypeOrmUserRepository,
    },
  ],
})
export class UserModule {}