import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../domain/entities/post.entity';
import { IPostRepository } from '../../domain/repositories/post.repository';

@Injectable()
export class PostRepositoryImpl implements IPostRepository {
  constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

  findAll(): Promise<Post[]> {
    return this.repo.find({ relations: ['user', 'comments', 'likes'] });
  }

  findById(id: number): Promise<Post | null> {
    return this.repo.findOne({ where: { id }, relations: ['user', 'comments', 'likes'] });
  }

  save(post: Post): Promise<Post> {
    return this.repo.save(post);
  }
}
