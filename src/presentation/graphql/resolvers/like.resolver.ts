import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Like } from '../../../domain/entities/like.entity';
import { LikeService } from '../../../application/services/like.service';
import { User } from '../../../domain/entities/user.entity';
import { Post } from '../../../domain/entities/post.entity';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Query(() => [Like])
  likes() {
    return this.likeService.getAll();
  }

  @Mutation(() => Like)
  addLike(@Args('userId') userId: number, @Args('postId') postId: number) {
    const user = new User();
    user.id = userId;
    const post = new Post();
    post.id = postId;
    return this.likeService.add(user, post);
  }
}
