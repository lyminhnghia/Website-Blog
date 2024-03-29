import {
  CanActivate,
  Injectable,
  ExecutionContext,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from 'src/config-database';
import { Observable } from 'rxjs';
import { MessageConst, response } from 'src/shared';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private config: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();

    if (!roles) {
      Logger.log(`${request.route['stack'][0].method} ${request.originalUrl}`);
      return true;
    }
    const token = request.headers['authorization'];
    if (Boolean(token)) {
      try {
        let convertToken = token.split(' ')[1];
        const user = jwt.verify(
          convertToken,
          this.config.environment.secretKey,
        );
        const role = user['role'];
        if (roles.includes(role)) {
          Logger.log(
            `${request.route['stack'][0].method} ${request.originalUrl} authorized`,
          );
          request.user = user;
          return true;
        }
      } catch (err) {
        Logger.log(
          `${request.route['stack'][0].method} ${request.originalUrl} unauthorized bad token`,
        );
        return response({
          status: HttpStatus.UNAUTHORIZED,
          error: err,
          message: [MessageConst.ERROR],
        });
      }
    }
    Logger.log(
      `${request.route['stack'][0].method} ${request.originalUrl} unauthorized no token`,
    );
    return false;
  }
}
