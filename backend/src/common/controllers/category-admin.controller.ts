import { Body, Controller, Post, Put, Delete, Param } from '@nestjs/common';
import { CategoryDto } from 'src/common/dto';
import { CategoryAdminProvider } from 'src/common/providers';
import { Roles } from 'src/common/decorators';
import { Enum, response } from 'src/shared';

@Controller('admin')
export class CategoryAdminController {
  constructor(private readonly categoryProvider: CategoryAdminProvider) {}

  @Post('category')
  @Roles(Enum.Role.admin)
  async createCategory(@Body() body: CategoryDto): Promise<object> {
    let objectData: object = await this.categoryProvider.create(body);

    return response(objectData);
  }

  @Put('category/:categoryId')
  @Roles(Enum.Role.admin)
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

  @Delete('/category/:categoryId')
  @Roles(Enum.Role.admin)
  async deleteCategory(@Param() params): Promise<object> {
    let objectData: object = await this.categoryProvider.delete(
      params.categoryId,
    );

    return response(objectData);
  }
}
