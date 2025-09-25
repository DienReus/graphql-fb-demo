import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { User } from '../../../domain/entities/user.entity';
import { UserService } from '../../../application/services/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  users() {
    return this.userService.getAllUsers();
  }

  @Query(() => User, { nullable: true })
  user(@Args('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Mutation(() => User)
  createUser(@Args('name') name: string) {
    return this.userService.createUser(name);
  }
}
