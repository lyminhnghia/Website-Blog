import { Injectable, HttpStatus } from '@nestjs/common';
import { UserEntity } from 'src/entities';
import {
  LoginDto,
  UserDto,
  ProfileDto,
  ChangePasswordDto,
} from 'src/common/dto';
import { UserProvider } from 'src/common/providers';
import { ConfigService } from 'src/config-database';
import { MessageConst } from 'src/shared';
import stringFormat from 'string-format';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthProvider {
  constructor(
    private userProvider: UserProvider,
    private config: ConfigService,
  ) {}

  async Login(data: LoginDto): Promise<object> {
    try {
      const user = await this.userProvider.findByUsername(data.username);
      if (!user) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: [stringFormat(MessageConst.MESSAGE_NOT_EXIST, 'Tài khoản')],
        };
      }

      const match = await bcrypt.compare(data.password, user.password);
      if (!match) {
        return {
          status: HttpStatus.BAD_GATEWAY,
          message: [stringFormat(MessageConst.MESSAGE_IS_INVALID, 'Mật khẩu')],
        };
      }

      let token = await this.createToken(user);

      return {
        data: {
          username: user.username,
          token: token,
          avatar: user.avatar,
          role: user.role,
        },
        message: [MessageConst.OK],
        status: HttpStatus.CREATED,
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

  async profile(id: number): Promise<object> {
    try {
      const user = await this.userProvider.findByPk(id);

      if (!user) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: [stringFormat(MessageConst.MESSAGE_NOT_EXIST, 'id')],
        };
      }

      return {
        data: UserDto.formatResponse(user),
        status: HttpStatus.OK,
        message: [MessageConst.OK],
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

  async updateProfile(id: number, body: ProfileDto): Promise<object> {
    try {
      const user = await this.userProvider.findByPk(id);

      if (!user) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: [stringFormat(MessageConst.MESSAGE_NOT_EXIST, 'id')],
        };
      }

      const userEntity = ProfileDto.formatRequestForm(body, user);

      const updateProfile = await userEntity.save();

      return {
        data: ProfileDto.formatResponse(updateProfile),
        status: HttpStatus.OK,
        message: [MessageConst.OK],
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

  async updatePassword(id: number, body: ChangePasswordDto): Promise<object> {
    try {
      const user = await this.userProvider.findByPk(id);
      if (!user) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: [stringFormat(MessageConst.MESSAGE_NOT_EXIST, 'User')],
        };
      }

      let errorMessage = [];
      const match = await bcrypt.compare(body.old_password, user.password);
      if (!match) {
        errorMessage.push(
          stringFormat(MessageConst.MESSAGE_IS_INVALID, 'Mật khẩu hiện tại'),
        );
      }

      if (body.new_password.length < 8) {
        errorMessage.push(
          stringFormat(
            MessageConst.LENGTH_MESSAGE,
            'mật khẩu mới có độ dài >= 8',
          ),
        );
      } else if (body.new_password.length > 24) {
        errorMessage.push(
          stringFormat(
            MessageConst.LENGTH_MESSAGE,
            'mật khẩu mới có độ dài <= 24',
          ),
        );
      }

      if (body.new_password !== body.confirm_password) {
        errorMessage.push(
          stringFormat(MessageConst.MESSAGE_IS_INVALID, 'Xác nhận mật khẩu'),
        );
      }

      if (errorMessage.length > 0) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: errorMessage,
        };
      }

      const userEntity = ChangePasswordDto.formatRequestForm(body, user);

      await userEntity.save();

      return {
        status: HttpStatus.OK,
        message: [MessageConst.OK],
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

  async createToken(data: UserEntity): Promise<string> {
    return await jwt.sign(
      {
        id: data.id,
        role: data.role,
      },
      this.config.environment.secretKey,
      {
        expiresIn: 86400,
      },
    );
  }
}
