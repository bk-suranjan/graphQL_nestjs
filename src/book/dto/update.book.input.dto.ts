import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateBookInput } from './create.book.input.dto';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class updateBook extends PartialType(CreateBookInput) {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;
}
