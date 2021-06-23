import {
  Body,
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Query,
  Param,
} from '@nestjs/common';
import { BlogProvider } from 'src/common/providers';
import { BlogDto } from 'src/common/dto';
import { response } from 'src/shared';

@Controller('admin')
export class BlogController {
  constructor(private readonly blogProvider: BlogProvider) {}

  @Post('blog')
  async createBlog(@Body() body: BlogDto): Promise<object> {
    let objectData: object = await this.blogProvider.create(body);
    return response({ data: objectData });
  }
}
