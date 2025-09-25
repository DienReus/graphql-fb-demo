import { Resolver, Query, Mutation, Args, Parent, ResolveField, Int } from '@nestjs/graphql';
import { CreateCommentInput } from 'src/application/dto/create-comment.input';
import { CreateLikeInput } from 'src/application/dto/create-like.input';
import { CreatePostInput } from 'src/application/dto/create-post.input';
import { CreateCommentUseCase } from 'src/application/services/post/create-comment';
import { CreateLikeUseCase } from 'src/application/services/post/create-like';
import { CreatePostUseCase } from 'src/application/services/post/create-post';
import { GetAllPostsUseCase } from 'src/application/services/post/get-all-posts';
import { Comment } from 'src/core/entities/comment.entity';
import { Like } from 'src/core/entities/like.entity';
import { Post } from 'src/core/entities/post.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly getAllPostsUseCase: GetAllPostsUseCase,
    private readonly createCommentUseCase: CreateCommentUseCase,
    private readonly createLikeUseCase: CreateLikeUseCase,
  ) {}

  @Query(() => [Post], { name: 'posts' })
  async getAllPosts(): Promise<Post[]> {
    return this.getAllPostsUseCase.execute();
  }

  @Mutation(() => Post)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput): Promise<Post> {
    return this.createPostUseCase.execute(createPostInput);
  }

  @Mutation(() => Comment)
  async createComment(@Args('createCommentInput') createCommentInput: CreateCommentInput): Promise<Comment> {
    return this.createCommentUseCase.execute(createCommentInput);
  }

  @Mutation(() => Like)
  async likePost(@Args('createLikeInput') createLikeInput: CreateLikeInput): Promise<Like> {
    return this.createLikeUseCase.execute(createLikeInput);
  }

  // Field Resolvers for calculated fields
  @ResolveField('likeCount', () => Int)
  getLikeCount(@Parent() post: Post): number {
    return post.likes?.length ?? 0;
  }

  @ResolveField('commentCount', () => Int)
  getCommentCount(@Parent() post: Post): number {
    return post.comments?.length ?? 0;
  }
}