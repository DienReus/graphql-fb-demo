import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';
import { Post } from './domain/entities/post.entity';
import { Comment } from './domain/entities/comment.entity';
import { Like } from './domain/entities/like.entity';
import { UserResolver } from './presentation/graphql/resolvers/user.resolver';
import { PostResolver } from './presentation/graphql/resolvers/post.resolver';
import { CommentResolver } from './presentation/graphql/resolvers/comment.resolver';
import { UserModule } from './modules/user.module';
import { PostModule } from './modules/post.module';
import { CommentModule } from './modules/comment.module';
import { LikeModule } from './modules/like.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-d340b5nfte5s73ebqi6g-a.oregon-postgres.render.com',
      port: 5432,
      username: 'veo3_api_user',
      password: 'WuIvkqeoiGlH2HPwxCfqju7iabdKnWD2',
      database: 'veo3_api',
      schema: 'fb-test',
      entities: [User, Post, Comment, Like],
      synchronize: true,
    }),
    UserModule,
    PostModule,
    CommentModule,
    LikeModule,
    TypeOrmModule.forFeature([User, Post, Comment, Like]),
  ],
  providers: [UserResolver, PostResolver, CommentResolver],
})
export class AppModule { }
