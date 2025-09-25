import { Comment } from "src/core/entities/comment.entity";
import { Like } from "src/core/entities/like.entity";
import { Post } from "src/core/entities/post.entity";


export const IPostRepository = Symbol('IPostRepository');

export interface IPostRepository {
  create(post: Partial<Post>, authorId: string): Promise<Post>;
  findAll(): Promise<Post[]>;
  addComment(postId: string, authorId: string, content: string): Promise<Comment>;
  addLike(postId: string, userId: string): Promise<Like>;
  removeLike(postId: string, userId: string): Promise<void>;
}