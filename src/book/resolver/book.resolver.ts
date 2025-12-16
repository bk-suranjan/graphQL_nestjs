import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book } from '../model/book.model';
import { BookService } from '../book.service';
import { CreateBookInput } from '../dto/create.book.input.dto';
import { updateBook } from '../dto/update.book.input.dto';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book], { name: 'getAllBooks' })
  async findAll() {
    return this.bookService.findAll();
  }
  @Query(() => Book, { name: 'getBook' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.bookService.findOne(id);
  }

  @Mutation(() => Book)
  async createBook(@Args('input') input: CreateBookInput) {
    return this.bookService.create(input);
  }

  @Mutation(() => Book)
  async update(@Args('input') input: updateBook) {
    return this.bookService.update(input);
  }

  @Mutation(() => Book)
  async deletBook(@Args('id', { type: () => String }) id: string) {
    return this.bookService.remove(id);
  }
}
