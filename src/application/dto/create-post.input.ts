import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  content: string;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  authorId: string;
}