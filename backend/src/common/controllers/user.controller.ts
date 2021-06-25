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
import { UserDto } from 'src/common/dto';
import { UserProvider } from 'src/common/providers';
import { response } from 'src/shared';

@Controller('admin')
export class UserController {
  constructor(private readonly userProvider: UserProvider) {}

  @Post('user')
  async createUser(@Body() body: UserDto): Promise<object> {
    let objectData: object = await this.userProvider.create(body);

    return response(objectData);
  }
}
