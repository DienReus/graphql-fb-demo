import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../../domain/entities/comment.entity';
import { ICommentRepository } from '../../domain/repositories/comment.repository';

@Injectable()
export class CommentRepositoryImpl implements ICommentRepository {
  constructor(@InjectRepository(Comment) private repo: Repository<Comment>) {}

  findAll(): Promise<Comment[]> {
    return this.repo.find({ relations: ['user', 'post'] });
  }

  save(comment: Comment): Promise<Comment> {
    return this.repo.save(comment);
  }
}
