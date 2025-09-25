import { Injectable } from '@nestjs/common';
import { ILikeRepository } from '../../domain/repositories/like.repository';
import { Like } from '../../domain/entities/like.entity';
import { User } from '../../domain/entities/user.entity';
import { Post } from '../../domain/entities/post.entity';

@Injectable()
export class LikeService {
  constructor(private readonly likeRepo: ILikeRepository) {}

  getAll(): Promise<Like[]> {
    return this.likeRepo.findAll();
  }

  add(user: User, post: Post): Promise<Like> {
    const like = new Like();
    like.user = user;
    like.post = post;
    return this.likeRepo.save(like);
  }
}
