import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/entities';
import { CategoryDto } from 'src/common/dto';
import { MessageConst } from 'src/shared';

@Injectable()
export class CategoryProvider {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(body: CategoryDto): Promise<object> {
    const categoryEntity = CategoryDto.formatCreateForm(body);

    // check exist Category title
    const category = await this.categoryRepository.findOne({
      where: {
        title: categoryEntity.title,
      },
    });

    if (category) {
      return {
        data: null,
        status: HttpStatus.BAD_REQUEST,
        message: [MessageConst.TITLE_EXIST],
      };
    }

    let dataCreated = await categoryEntity.save();

    return {
      data: CategoryDto.formatResponseDetails(dataCreated),
      status: HttpStatus.CREATED,
      message: [MessageConst.CREATED],
    };
  }
}
