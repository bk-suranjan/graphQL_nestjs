import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './model/book.model';
import { Model } from 'mongoose';
import { CreateBookInput } from './dto/create.book.input.dto';
import { updateBook } from './dto/update.book.input.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async create(input: CreateBookInput): Promise<Book> {
    return await this.bookModel.create(input);
  }

  async findAll(): Promise<Book[]> {
    return await this.bookModel.find({});
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async update(input: updateBook): Promise<Book> {
    const book = await this.bookModel.findById(input.id);
    if (!book) {
      throw new NotFoundException('Book not found to update');
    }
    Object.assign(book, input);
    return book.save();
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.bookModel.findByIdAndUpdate(id);
    if (!result) {
      throw new NotFoundException('Book not found');
    }
    return true;
  }
}
