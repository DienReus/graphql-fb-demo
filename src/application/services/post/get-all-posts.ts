import { Injectable, Inject } from '@nestjs/common';
import { IPostRepository } from '../../interfaces/post-repository.interface';
import { Post } from 'src/core/entities/post.entity';

@Injectable()
export class GetAllPostsUseCase {
  constructor(
    @Inject(IPostRepository)
    private readonly postRepository: IPostRepository,
  ) {}

  async execute(): Promise<Post[]> {
    return this.postRepository.findAll();
  }
}