import { Injectable, Inject } from '@nestjs/common';
import { IPostRepository } from '../../interfaces/post-repository.interface';
import { CreatePostInput } from 'src/application/dto/create-post.input';
import { Post } from 'src/core/entities/post.entity';

@Injectable()
export class CreatePostUseCase {
  constructor(
    @Inject(IPostRepository)
    private readonly postRepository: IPostRepository,
  ) {}

  async execute(input: CreatePostInput): Promise<Post> {
    const { authorId, ...postData } = input;
    return this.postRepository.create(postData, authorId);
  }
}