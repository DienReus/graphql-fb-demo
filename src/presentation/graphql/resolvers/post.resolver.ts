import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Post } from '../../../domain/entities/post.entity';
import { PostService } from '../../../application/services/post.service';
import { User } from '../../../domain/entities/user.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  posts() {
    return this.postService.getAll();
  }

  @Query(() => Post, { nullable: true })
  post(@Args('id') id: number) {
    return this.postService.getById(id);
  }

  @Mutation(() => Post)
  createPost(@Args('content') content: string, @Args('userId') userId: number) {
    const user = new User();
    user.id = userId;
    return this.postService.create(content, user);
  }
}
