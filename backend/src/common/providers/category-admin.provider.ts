import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/entities';
import { CategoryDto } from 'src/common/dto';
import { MessageConst } from 'src/shared';

@Injectable()
export class CategoryAdminProvider {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(body: CategoryDto): Promise<object> {
    try {
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
    } catch {
      (error) => {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: [MessageConst.ERROR],
          error: error,
        };
      };
    }
  }

  async update(id: string, body: CategoryDto): Promise<object> {
    try {
      let categoryId: number = parseInt(id);
      const categoryEntity = CategoryDto.formatRequestForm({
        id: categoryId,
        ...body,
      });

      // check exist category id and category title
      const category = await this.findByPkAndTitle(
        categoryId,
        categoryEntity.title,
      );
      if (category) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: [MessageConst.TITLE_EXIST],
        };
      }

      let dataUpdated = await this.categoryRepository.save(categoryEntity);
      return {
        data: CategoryDto.formatResponseDetails(dataUpdated),
        status: HttpStatus.OK,
        message: [MessageConst.UPDATED],
      };
    } catch {
      (error) => {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: [MessageConst.ERROR],
          error: error,
        };
      };
    }
  }

  async delete(categoryId: number): Promise<object> {
    try {
      const category = await this.categoryRepository
        .createQueryBuilder('categories')
        .where('categories.id = :categoryId', { categoryId })
        .getOne();

      // check exist category id
      if (!category) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: [MessageConst.NOT_FOUND],
        };
      }

      await this.categoryRepository
        .createQueryBuilder()
        .delete()
        .from(CategoryEntity)
        .where('categories.id = :categoryId', { categoryId })
        .execute();

      return {
        status: HttpStatus.OK,
        message: [MessageConst.DELETED],
      };
    } catch {
      (error) => {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: [MessageConst.ERROR],
          error: error,
        };
      };
    }
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

  async findByPk(id: number): Promise<CategoryEntity> {
    return await this.categoryRepository
      .createQueryBuilder('categories')
      .where('categories.id != :id', {
        id,
      })
      .getOne();
  }
}
