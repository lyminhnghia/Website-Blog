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
import { UserDto, UserUpdateDto } from 'src/common/dto';
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

  @Put('user/:userId')
  async updateUser(
    @Param() params,
    @Body() body: UserUpdateDto,
  ): Promise<object> {
    let objectData: object = await this.userProvider.update(
      params.userId,
      body,
    );

    return response(objectData);
  }

  @Get('user')
  async getUser(@Query() query): Promise<object> {
    let objectData: object = await this.userProvider.get(query);

    return response(objectData);
  }

  @Delete('user/:userId')
  async deleteUser(@Param() params): Promise<object> {
    let objectData: object = await this.userProvider.delete(params.userId);

    return response(objectData);
  }
}
