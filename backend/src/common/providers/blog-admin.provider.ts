import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { BlogEntity } from 'src/entities';
import { BlogDto } from 'src/common/dto';
import { MessageConst, pageFormat } from 'src/shared';

@Injectable()
export class BlogProvider {
  constructor(
    @InjectRepository(BlogEntity)
    private blogRepository: Repository<BlogEntity>,
  ) {}

  async create(body: BlogDto): Promise<object> {
    try {
      body.categories = body.categories.map((item) => item.id);
      body.hastags = body.hastags.map((item) => item.id);

      const blogEntity = BlogDto.formatRequestForm(body);

      // check exist blog title
      const blog = await this.blogRepository.findOne({
        where: {
          title: blogEntity.title,
        },
      });

      if (blog) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: [MessageConst.TITLE_EXIST],
        };
      }

      return {
        data: BlogDto.formatResponseDetails(blogEntity),
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
}
