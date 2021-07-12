import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities';
import { UserDto, UserUpdateDto } from 'src/common/dto';
import { MessageConst, pageFormat } from 'src/shared';
import stringFormat from 'string-format';

@Injectable()
export class UserProvider {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(body: UserDto): Promise<object> {
    try {
      let errorMessage = [];
      let checkUsername = await this.userRepository.findOne({
        where: {
          username: body.username,
        },
      });
      if (checkUsername) {
        errorMessage.push(stringFormat(MessageConst.MESSAGE_EXIST, 'Username'));
      }
      if (body.username.length < 6) {
        errorMessage.push(
          stringFormat(MessageConst.LENGTH_MESSAGE, 'username >= 6'),
        );
      }
      if (body.username.length > 24) {
        errorMessage.push(
          stringFormat(MessageConst.LENGTH_MESSAGE, 'username <= 24'),
        );
      }
      if (body.password.length < 8) {
        errorMessage.push(
          stringFormat(MessageConst.LENGTH_MESSAGE, 'password >= 8'),
        );
      }
      if (body.password.length > 24) {
        errorMessage.push(
          stringFormat(MessageConst.LENGTH_MESSAGE, 'password <= 24'),
        );
      }

      if (errorMessage.length > 0) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: errorMessage,
        };
      }
      const userEntity = UserDto.formatRequestForm(body);
      let newUser = await userEntity.save();
      return {
        data: UserDto.formatResponse(newUser),
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

  async update(id: number, body: UserUpdateDto): Promise<object> {
    try {
      let errorMessage = [];
      if (body.password) {
        if (body.password.length < 8) {
          errorMessage.push(
            stringFormat(MessageConst.LENGTH_MESSAGE, 'password >= 8'),
          );
        }
        if (body.password.length > 24) {
          errorMessage.push(
            stringFormat(MessageConst.LENGTH_MESSAGE, 'password <= 24'),
          );
        }
      }

      if (errorMessage.length > 0) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: errorMessage,
        };
      }
      const userCurrent = await this.findByPk(id);
      const userEntity = UserUpdateDto.formatRequestForm(userCurrent, body);

      let newUser = await userEntity.save();
      return {
        data: UserUpdateDto.formatResponse(newUser),
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

  async get(query: object): Promise<object> {
    try {
      let queryData: any = pageFormat(query);
      if (!queryData.paging) {
        const [users, total] = await this.userRepository
          .createQueryBuilder('user')
          .getManyAndCount();
        return {
          data: users.map((item) => UserDto.formatResponse(item)),
          total: total,
          status: HttpStatus.OK,
        };
      }
      const [users, total] = await this.userRepository
        .createQueryBuilder('user')
        .skip(queryData.page - 1)
        .take(queryData.size)
        .where(
          'user.username LIKE :filter OR user.first_name LIKE :filter OR user.last_name LIKE :filter',
          {
            filter: `%${queryData?.filter || ''}%`,
          },
        )
        .orderBy('user.created', 'DESC')
        .getManyAndCount();
      return {
        data: users.map((item) => UserDto.formatResponse(item)),
        total: total,
        page: queryData.page,
        size: queryData.size,
        status: HttpStatus.OK,
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

  async delete(id: number): Promise<object> {
    try {
      const userEntity: UserEntity = await this.findByPk(id);
      if (!userEntity) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: [MessageConst.NOT_FOUND],
        };
      }
      await this.userRepository
        .createQueryBuilder()
        .delete()
        .from(UserEntity)
        .where('user.id = :userId', { userId: id })
        .execute();

      return {
        data: {
          id: id,
        },
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

  async findByPk(id: number): Promise<UserEntity> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', {
        userId: id,
      })
      .getOne();
  }

  async findByUsername(username: string): Promise<UserEntity> {
    return await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.username',
        'user.password',
        'user.role',
        'user.avatar',
      ])
      .where('user.username = :username', { username: username })
      .getOne();
  }
}
