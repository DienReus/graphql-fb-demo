import { Inject, Injectable } from '@nestjs/common';
import { IPostRepository } from '../../interfaces/post-repository.interface';
import { CreateLikeInput } from 'src/application/dto/create-like.input';
import { Like } from 'src/core/entities/like.entity';

@Injectable()
export class CreateLikeUseCase {
    constructor(
        @Inject(IPostRepository)
        private readonly postRepository: IPostRepository,
    ) {}

    async execute(input: CreateLikeInput): Promise<Like> {
        const { postId, userId } = input;
        return this.postRepository.addLike(postId, userId);
    }
}