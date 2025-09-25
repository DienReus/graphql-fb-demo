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

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nestdb',
      entities: [User, Post, Comment, Like],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Post, Comment, Like]),
  ],
  providers: [UserResolver, PostResolver, CommentResolver],
})
export class AppModule {}
