import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/entities';
import { CategoryDto } from 'src/common/dto';
import { Enum } from 'src/shared';

@Injectable()
export class CategoryProvider {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(body: CategoryDto): Promise<object> {
    const categoryEntity = CategoryDto.formatCreateForm(body);

    let dataCreated = await categoryEntity.save();

    return {
      data: CategoryDto.formatResponseDetails(dataCreated),
      status: HttpStatus.CREATED,
    };
  }

  async findByItem(): Promise<CategoryEntity> {
    return;
  }
}
