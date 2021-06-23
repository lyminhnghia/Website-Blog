import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CategoryEntity } from 'src/entities';
import { CategoryDto } from 'src/common/dto';
import { MessageConst, pageFormat } from 'src/shared';

@Injectable()
export class CategoryCommonProvider {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getById(categoryId: number): Promise<object> {
    try {
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

  async get(query): Promise<object> {
    try {
      let queryData: any = pageFormat(query);
      if (!queryData.paging) {
        const categories = await this.categoryRepository
          .createQueryBuilder('categories')
          .getMany();
        let formatCategory: any = categories.map((item) =>
          CategoryDto.formatResponseDetails(item),
        );
        return {
          data: formatCategory,
          total: formatCategory.length,
          status: HttpStatus.OK,
        };
      } else {
        const [
          categories,
          total,
        ]: any = await this.categoryRepository.findAndCount({
          where: {
            title: Like(`%${queryData.filter || ''}%`),
          },
          order: {
            created: 'DESC',
          },
          take: queryData.size,
          skip: queryData.page - 1,
        });

        let formatCategory: any = categories.map((item) =>
          CategoryDto.formatResponseDetails(item),
        );

        return {
          data: formatCategory,
          total: total,
          page: queryData.page,
          size: queryData.size,
          status: HttpStatus.OK,
        };
      }
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
}
