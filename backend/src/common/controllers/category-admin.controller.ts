import { Body, Controller, Post } from '@nestjs/common';
import { CreateCategoryDto } from 'src/common/dto';
import { CategoryProvider } from 'src/common/providers';
import { response } from 'src/shared';

@Controller('admin')
export class CategoryAdminController {
  constructor(private readonly categoryProvider: CategoryProvider) {}

  @Post('category')
  async signUp(@Body() body: CreateCategoryDto): Promise<object> {
    let dataCreated = await this.categoryProvider.create(body);
    return response({ data: dataCreated });
  }
}
