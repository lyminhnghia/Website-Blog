import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { BlogEntity } from 'src/entities';
import { CategoryAdminProvider, HastagProvider } from 'src/common/providers';
import { BlogDto } from 'src/common/dto';
import { Enum, MessageConst, pageFormat } from 'src/shared';

@Injectable()
export class BlogProvider {
  constructor(
    @InjectRepository(BlogEntity)
    private blogRepository: Repository<BlogEntity>,
    private categoryAdminProvider: CategoryAdminProvider,
    private hastagProvider: HastagProvider,
  ) {}

  async create(body: BlogDto): Promise<object> {
    try {
      // check categories valid and push entity category to array
      let categories = [];
      for (let i = 0; i < body.categories.length; i++) {
        let category = await this.categoryAdminProvider.findByPk(
          body.categories[i].id,
        );
        if (category) {
          categories.push(category);
        } else {
          return {
            status: HttpStatus.NOT_FOUND,
            message: [MessageConst.NOT_FOUND_CATEGORY],
          };
        }
      }

      // check categories valid and push entity hastag to array
      let hastags = [];
      for (let i = 0; i < body.hastags.length; i++) {
        let hastag = await this.hastagProvider.findByPk(body.hastags[i].id);
        if (hastag) {
          hastags.push(hastag);
        } else {
          return {
            status: HttpStatus.NOT_FOUND,
            message: [MessageConst.NOT_FOUND_HASTAG],
          };
        }
      }

      // format form blog dto to entity
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

      // create new blog
      await blogEntity.save();

      if (blog) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: [MessageConst.TITLE_EXIST],
        };
      }

      let message = [];
      switch (blogEntity.status) {
        case Enum.Status.published:
          message.push(MessageConst.PUBLISHED_BLOG);
          break;
        case Enum.Status.draft:
          message.push(MessageConst.CREATED_DRAFT_BLOG);
          break;
        default:
          return {
            status: HttpStatus.BAD_REQUEST,
            message: [MessageConst.STATUS_ERROR],
          };
      }

      return {
        status: HttpStatus.CREATED,
        message: message,
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
