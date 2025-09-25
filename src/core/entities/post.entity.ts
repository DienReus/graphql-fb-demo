import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Like } from './like.entity';

@ObjectType()
@Entity('posts')
export class Post {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('text')
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  @Field()
  createdAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' })
  author: User;

  @Field(() => [Comment])
  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @OneToMany(() => Like, like => like.post)
  likes: Like[];

  @Field(() => Int, { description: 'Calculated field for number of likes' })
  likeCount: number;

  @Field(() => Int, { description: 'Calculated field for number of comments' })
  commentCount: number;
}