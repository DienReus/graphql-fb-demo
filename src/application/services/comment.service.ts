import { Injectable } from '@nestjs/common';
import { ICommentRepository } from '../../domain/repositories/comment.repository';
import { Comment } from '../../domain/entities/comment.entity';
import { User } from '../../domain/entities/user.entity';
import { Post } from '../../domain/entities/post.entity';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepo: ICommentRepository) {}

  getAll(): Promise<Comment[]> {
    return this.commentRepo.findAll();
  }

  create(text: string, user: User, post: Post): Promise<Comment> {
    const comment = new Comment();
    comment.text = text;
    comment.user = user;
    comment.post = post;
    return this.commentRepo.save(comment);
  }
}
