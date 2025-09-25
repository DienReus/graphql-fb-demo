import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Comment } from '../../../domain/entities/comment.entity';
import { CommentService } from '../../../application/services/comment.service';
import { User } from '../../../domain/entities/user.entity';
import { Post } from '../../../domain/entities/post.entity';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [Comment])
  comments() {
    return this.commentService.getAll();
  }

  @Mutation(() => Comment)
  addComment(@Args('text') text: string, @Args('userId') userId: number, @Args('postId') postId: number) {
    const user = new User();
    user.id = userId;
    const post = new Post();
    post.id = postId;
    return this.commentService.create(text, user, post);
  }
}
