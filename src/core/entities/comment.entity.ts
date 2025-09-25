import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@ObjectType()
@Entity('comments')
export class Comment {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('text')
  content: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, user => user.comments, { onDelete: 'CASCADE' })
  author: User;

  @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' })
  post: Post;
}