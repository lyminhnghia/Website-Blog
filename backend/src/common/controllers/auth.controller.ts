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
import { LoginDto, JwtDto } from 'src/common/dto';
import { AuthProvider } from 'src/common/providers';
import { Enum, response } from 'src/shared';
import { Roles, AuthUser } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authProvider: AuthProvider) {}

  @Post('login')
  async Login(@Body() body: LoginDto): Promise<object> {
    let objectData: object = await this.authProvider.Login(body);

    return response(objectData);
  }

  @Get('profile')
  @Roles(Enum.Role.admin, Enum.Role.manager, Enum.Role.user)
  async getProfile(@AuthUser() user: JwtDto): Promise<object> {
    let objectData: object = await this.authProvider.profile(user.id);

    return response(objectData);
  }
}
