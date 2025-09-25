import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '../../domain/entities/like.entity';
import { ILikeRepository } from '../../domain/repositories/like.repository';

@Injectable()
export class LikeRepositoryImpl implements ILikeRepository {
  constructor(@InjectRepository(Like) private repo: Repository<Like>) {}

  findAll(): Promise<Like[]> {
    return this.repo.find({ relations: ['user', 'post'] });
  }

  save(like: Like): Promise<Like> {
    return this.repo.save(like);
  }
}
