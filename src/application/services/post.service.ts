import { Injectable } from '@nestjs/common';
import { IPostRepository } from '../../domain/repositories/post.repository';
import { Post } from '../../domain/entities/post.entity';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class PostService {
  constructor(private readonly postRepo: IPostRepository) {}

  getAll(): Promise<Post[]> {
    return this.postRepo.findAll();
  }

  getById(id: number): Promise<Post | null> {
    return this.postRepo.findById(id);
  }

  create(content: string, user: User): Promise<Post> {
    const post = new Post();
    post.content = content;
    post.user = user;
    return this.postRepo.save(post);
  }
}
