import { Body, Controller, Post, Put, Get, Param } from '@nestjs/common';
import { CategoryDto } from 'src/common/dto';
import { CategoryProvider } from 'src/common/providers';
import { response } from 'src/shared';

@Controller('admin')
export class CategoryAdminController {
  constructor(private readonly categoryProvider: CategoryProvider) {}

  @Post('category')
  async createCategory(@Body() body: CategoryDto): Promise<object> {
    let objectData: object = await this.categoryProvider.create(body);

    return response(objectData);
  }

  @Put('category/:categoryId')
  async updateCategory(
    @Param() params,
    @Body() body: CategoryDto,
  ): Promise<object> {
    let objectData: object = await this.categoryProvider.update(
      params.categoryId,
      body,
    );

    return response(objectData);
  }

  @Get('/category/:categoryId')
  async getCategoryById(@Param() params): Promise<object> {
    let objectData: object = await this.categoryProvider.getById(
      params.categoryId,
    );

    return response(objectData);
  }
}
