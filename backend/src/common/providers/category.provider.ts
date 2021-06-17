import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../../entities';
import { Category } from '../interfaces';

@Injectable()
export class CategoryProvider {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(category: Category): Promise<Category> {
    const categoryEntity = new CategoryEntity();
    return;
  }
}
