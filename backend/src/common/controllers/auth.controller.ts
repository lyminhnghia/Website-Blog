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
import { LoginDto } from 'src/common/dto';
import { AuthProvider } from 'src/common/providers';
import { response } from 'src/shared';

@Controller('auth')
export class AuthController {
  constructor(private readonly authProvider: AuthProvider) {}

  @Post('login')
  async Login(@Body() body: LoginDto): Promise<object> {
    let objectData: object = await this.authProvider.Login(body);

    return response(objectData);
  }
}
