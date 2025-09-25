import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateLikeInput {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  postId: string;
}