import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { Like } from './like.entity';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column()
  email: string;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];

  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[];

  @OneToMany(() => Like, like => like.user)
  likes: Like[];
}