import { Like } from '../entities/like.entity';

export abstract class ILikeRepository {
  abstract findAll(): Promise<Like[]>;
  abstract save(like: Like): Promise<Like>;
}
