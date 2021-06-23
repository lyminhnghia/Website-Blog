import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { CategoryDto } from 'src/common/dto';
import { CategoryProvider } from 'src/common/providers';
import { response } from 'src/shared';

@Controller('admin')
export class CategoryAdminController {
  constructor(private readonly categoryProvider: CategoryProvider) {}

  @Post('category')
  async signUp(@Body() body: CategoryDto): Promise<object> {
    let objectData: object = await this.categoryProvider.create(body);

    return response(objectData);
  }
}
