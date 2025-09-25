import { Inject, Injectable } from '@nestjs/common';
import { IPostRepository } from '../../interfaces/post-repository.interface';
import { CreateCommentInput } from 'src/application/dto/create-comment.input';
import { Comment } from 'src/core/entities/comment.entity';

@Injectable()
export class CreateCommentUseCase {
    constructor(
        @Inject(IPostRepository)
        private readonly postRepository: IPostRepository,
    ) {}

    async execute(input: CreateCommentInput): Promise<Comment> {
        const { postId, authorId, content } = input;
        return this.postRepository.addComment(postId, authorId, content);
    }
}