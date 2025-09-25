import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPostRepository } from '../../../application/interfaces/post-repository.interface';
import { Post } from 'src/core/entities/post.entity';
import { User } from 'src/core/entities/user.entity';
import { Comment } from 'src/core/entities/comment.entity';
import { Like } from 'src/core/entities/like.entity';

@Injectable()
export class TypeOrmPostRepository implements IPostRepository {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Comment) private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Like) private readonly likeRepo: Repository<Like>,
  ) {}

  async create(postData: Partial<Post>, authorId: string): Promise<Post> {
    const author = await this.userRepo.findOneBy({ id: authorId });
    if (!author) {
      throw new NotFoundException(`User with ID ${authorId} not found`);
    }
    const newPost = this.postRepo.create({ ...postData, author });
    return this.postRepo.save(newPost);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepo.find({
      relations: ['author', 'comments', 'likes', 'comments.author'],
      order: { createdAt: 'DESC' },
    });
  }

  async addComment(postId: string, authorId: string, content: string): Promise<Comment> {
    const post = await this.postRepo.findOneBy({ id: postId });
    if (!post) throw new NotFoundException(`Post with ID ${postId} not found`);

    const author = await this.userRepo.findOneBy({ id: authorId });
    if (!author) throw new NotFoundException(`User with ID ${authorId} not found`);

    const newComment = this.commentRepo.create({ content, post, author });
    return this.commentRepo.save(newComment);
  }

  async addLike(postId: string, userId: string): Promise<Like> {
    const post = await this.postRepo.findOneBy({ id: postId });
    if (!post) throw new NotFoundException(`Post with ID ${postId} not found`);

    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    // Check if like already exists to prevent duplicate error
    const existingLike = await this.likeRepo.findOne({ where: { post: { id: postId }, user: { id: userId } } });
    if (existingLike) return existingLike;

    const newLike = this.likeRepo.create({ post, user });
    return this.likeRepo.save(newLike);
  }

  async removeLike(postId: string, userId: string): Promise<void> {
    const result = await this.likeRepo.delete({ post: { id: postId }, user: { id: userId } });
    if (result.affected === 0) {
        throw new NotFoundException(`Like by user ${userId} on post ${postId} not found`);
    }
  }
}