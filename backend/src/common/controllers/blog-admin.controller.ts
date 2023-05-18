import {
  Body,
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { BlogProvider } from 'src/common/providers';
import { BlogDto } from 'src/common/dto';
import { Roles } from 'src/common/decorators';
import { Enum, response } from 'src/shared';

@Controller('admin')
export class BlogController {
  constructor(private readonly blogProvider: BlogProvider) {}

  @Post('blog')
  @Roles(Enum.Role.admin, Enum.Role.manager, Enum.Role.user)
  async createBlog(@Body() body: BlogDto): Promise<object> {
    let objectData: object = await this.blogProvider.create(body);
    return response(objectData);
  }

  @Put('blog/:blogId')
  @Roles(Enum.Role.admin, Enum.Role.manager, Enum.Role.user)
  async updateBlog(@Param() params, @Body() body: BlogDto): Promise<object> {
    let objectData: object = await this.blogProvider.update(
      params.blogId,
      body,
    );
    return response(objectData);
  }

  @Get('blog/:blogId')
  @Roles(Enum.Role.admin, Enum.Role.manager, Enum.Role.user)
  async getBlogById(@Param() params): Promise<object> {
    let objectData: object = await this.blogProvider.getById(params.blogId);
    return response(objectData);
  }

  @Delete('blog/:blogId')
  @Roles(Enum.Role.admin, Enum.Role.manager, Enum.Role.user)
  async deleteBlog(@Param() params): Promise<object> {
    let objectData: object = await this.blogProvider.delete(params.blogId);
    return response(objectData);
  }
}
