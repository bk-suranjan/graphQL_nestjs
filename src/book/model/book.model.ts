import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
@ObjectType()
export class Book {
  @Field(() => ID)
  declare readonly _id: string;

  @Prop({ required: true })
  @Field()
  title: string;

  @Prop()
  @Field({ nullable: true })
  descripation?: string;

  @Prop({ required: true })
  @Field()
  Author: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
