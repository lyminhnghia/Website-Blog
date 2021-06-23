import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/entities';
import { CreateCategoryDto } from 'src/common/dto';

@Injectable()
export class CategoryProvider {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(body: CreateCategoryDto): Promise<object> {
    const categoryEntity = new CategoryEntity();
    return {};
  }
}
