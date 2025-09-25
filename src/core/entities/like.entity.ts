import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@ObjectType()
@Entity('likes')
@Unique(['user', 'post'])
export class Like {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.likes, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Post, post => post.likes, { onDelete: 'CASCADE' })
  post: Post;
}