import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserInput } from 'src/application/dto/create-user.input';
import { CreateUserUseCase } from 'src/application/services/user/create-user';
import { User } from 'src/core/entities/user.entity';
@Resolver(() => User)
export class UserResolver {
    constructor(private readonly createUserUseCase: CreateUserUseCase) { }

    @Mutation(() => User)
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
        return this.createUserUseCase.execute(createUserInput);
    }
}