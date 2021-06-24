import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { BlogEntity } from 'src/entities';
import { CategoryAdminProvider, HastagProvider } from 'src/common/providers';
import { BlogDto } from 'src/common/dto';
import { MessageConst, pageFormat } from 'src/shared';

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
            message: [''],
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
            message: [''],
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
      let newEntity = await blogEntity.save();

      if (blog) {
        return {
          data: newEntity,
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
