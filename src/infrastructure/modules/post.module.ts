import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostResolver } from '../../adapters/graphql/post.resolver';
import { IPostRepository } from '../../application/interfaces/post-repository.interface';
import { TypeOrmPostRepository } from '../database/repositories/typeorm-post.repository';
import { Post } from 'src/core/entities/post.entity';
import { User } from 'src/core/entities/user.entity';
import { Like } from 'src/core/entities/like.entity';
import { CreatePostUseCase } from 'src/application/services/post/create-post';
import { GetAllPostsUseCase } from 'src/application/services/post/get-all-posts';
import { CreateCommentUseCase } from 'src/application/services/post/create-comment';
import { CreateLikeUseCase } from 'src/application/services/post/create-like';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Comment, Like])],
  providers: [
    PostResolver,
    CreatePostUseCase,
    GetAllPostsUseCase,
    CreateCommentUseCase,
    CreateLikeUseCase,
    {
      provide: IPostRepository,
      useClass: TypeOrmPostRepository,
    },
  ],
})
export class PostModule {}