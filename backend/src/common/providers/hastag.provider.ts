import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { HastagEntity } from 'src/entities';
import { HastagDto } from 'src/common/dto';
import { MessageConst, pageFormat } from 'src/shared';

@Injectable()
export class HastagProvider {
  constructor(
    @InjectRepository(HastagEntity)
    private hastagRepository: Repository<HastagEntity>,
  ) {}

  async create(body: HastagDto): Promise<object> {
    try {
      const hastagEntity = HastagDto.formatRequestForm(body);

      // check exist Hastag title
      const hastag = await this.hastagRepository.findOne({
        where: {
          title: hastagEntity.title,
        },
      });

      if (hastag) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: [MessageConst.TITLE_EXIST],
        };
      }

      let dataCreated = await hastagEntity.save();

      return {
        data: HastagDto.formatResponseDetails(dataCreated),
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

  async update(id: string, body: HastagDto): Promise<object> {
    try {
      let hastagId: number = parseInt(id);
      const hastagEntity = HastagDto.formatRequestForm({
        id: hastagId,
        ...body,
      });

      // check exist hastag id and hastag title
      const hastag = await this.findByPkAndTitle(hastagId, hastagEntity.title);
      if (hastag) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: [MessageConst.TITLE_EXIST],
        };
      }
      let dataUpdated = await this.hastagRepository.save(hastagEntity);
      return {
        data: HastagDto.formatResponseDetails(dataUpdated),
        status: HttpStatus.OK,
        message: [MessageConst.UPDATED],
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

  async get(query): Promise<object> {
    try {
      let queryData: any = pageFormat(query);
      if (!queryData.paging) {
        const hastags = await this.hastagRepository
          .createQueryBuilder('hastags')
          .getMany();
        let formatHastag: any = hastags.map((item) =>
          HastagDto.formatResponseDetails(item),
        );
        return {
          data: formatHastag,
          total: formatHastag.length,
          status: HttpStatus.OK,
        };
      } else {
        const [hastags, total]: any = await this.hastagRepository.findAndCount({
          where: {
            title: Like(`%${queryData.filter || ''}%`),
          },
          order: {
            created: 'DESC',
          },
          take: queryData.size,
          skip: queryData.page - 1,
        });

        let formatHastag: any = hastags.map((item) =>
          HastagDto.formatResponseDetails(item),
        );

        return {
          data: formatHastag,
          total: total,
          page: queryData.page,
          size: queryData.size,
          status: HttpStatus.OK,
        };
      }
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

  async delete(hastagId: number): Promise<object> {
    try {
      const hastag = await this.hastagRepository
        .createQueryBuilder('hastags')
        .where('hastags.id = :hastagId', { hastagId })
        .getOne();

      // check exist hastag id
      if (!hastag) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: [MessageConst.NOT_FOUND],
        };
      }

      await this.hastagRepository
        .createQueryBuilder()
        .delete()
        .from(HastagEntity)
        .where('hastags.id = :hastagId', { hastagId })
        .execute();

      return {
        status: HttpStatus.OK,
        message: [MessageConst.DELETED],
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

  async findByPkAndTitle(
    hastagId: number,
    title: string,
  ): Promise<HastagEntity> {
    return await this.hastagRepository
      .createQueryBuilder('hastags')
      .where('hastags.id != :hastagId AND hastags.title = :title', {
        hastagId,
        title,
      })
      .getOne();
  }
}
