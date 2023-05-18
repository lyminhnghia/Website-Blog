import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoryCommonProvider } from 'src/common/providers';
import { response } from 'src/shared';

@Controller('common')
export class CategoryCommonController {
  constructor(private readonly categoryProvider: CategoryCommonProvider) {}

  @Get('/category/:categoryId')
  async getCategoryById(@Param() params): Promise<object> {
    let objectData: object = await this.categoryProvider.getById(
      params.categoryId,
    );

    return response(objectData);
  }

  @Get('/category')
  async getCategory(@Query() query): Promise<object> {
    let objectData: object = await this.categoryProvider.get(query);

    return response(objectData);
  }

  @Get('/category-blog')
  async getCategoryBlog(@Query() query): Promise<object> {
    let objectData: object = await this.categoryProvider.getCategoryBlog(query);

    return response(objectData);
  }
}
