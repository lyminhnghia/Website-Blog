import { Injectable, HttpStatus } from '@nestjs/common';
import { UserEntity } from 'src/entities';
import { LoginDto } from 'src/common/dto';
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
