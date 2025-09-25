import { Post } from '../entities/post.entity';

export abstract class IPostRepository {
  abstract findAll(): Promise<Post[]>;
  abstract findById(id: number): Promise<Post | null>;
  abstract save(post: Post): Promise<Post>;
}
