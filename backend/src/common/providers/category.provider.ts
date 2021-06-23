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
    const categoryEntity = CategoryDto.formatRequestForm(body);

    // check exist Category title
    const category = await this.categoryRepository.findOne({
      where: {
        title: categoryEntity.title,
      },
    });

    if (category) {
      return {
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

  async update(id: number, body: CategoryDto): Promise<object> {
    const categoryEntity = CategoryDto.formatRequestForm(body);

    // check exist category id and category title
    const category = await this.findByPkAndTitle(id, categoryEntity.title);
    if (category) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: [MessageConst.TITLE_EXIST],
      };
    }

    let dataUpdated = await categoryEntity.save();
    return {
      data: CategoryDto.formatResponseDetails(dataUpdated),
      status: HttpStatus.OK,
      message: [MessageConst.UPDATED],
    };
  }

  async getById(categoryId: number): Promise<object> {
    const category = await this.categoryRepository
      .createQueryBuilder('categories')
      .leftJoin('categories.blogs', 'blogs')
      .where('categories.id = :categoryId', { categoryId })
      .getOne();

    // check exist category id
    if (!category) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: [MessageConst.NOT_FOUND],
      };
    }

    return {
      data: CategoryDto.formatResponseDetails(category),
      status: HttpStatus.OK,
    };
  }

  async findByPkAndTitle(
    categoryId: number,
    title: string,
  ): Promise<CategoryEntity> {
    return await this.categoryRepository
      .createQueryBuilder('categories')
      .where('categories.id != :categoryId AND categories.title = :title', {
        categoryId,
        title,
      })
      .getOne();
  }
}
