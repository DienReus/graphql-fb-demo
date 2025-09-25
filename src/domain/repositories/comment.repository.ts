import { Comment } from '../entities/comment.entity';

export abstract class ICommentRepository {
  abstract findAll(): Promise<Comment[]>;
  abstract save(comment: Comment): Promise<Comment>;
}
