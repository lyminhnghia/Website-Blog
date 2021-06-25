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
    return response(objectData);
  }

  @Put('blog/:blogId')
  async updateBlog(@Param() params, @Body() body: BlogDto): Promise<object> {
    let objectData: object = await this.blogProvider.update(
      params.blogId,
      body,
    );
    return response(objectData);
  }

  @Get('blog/:blogId')
  async getBlogById(@Param() params): Promise<object> {
    let objectData: object = await this.blogProvider.getById(params.blogId);
    return response(objectData);
  }

  @Delete('blog/:blogId')
  async deleteBlog(@Param() params): Promise<object> {
    let objectData: object = await this.blogProvider.delete(params.blogId);
    return response(objectData);
  }
}
