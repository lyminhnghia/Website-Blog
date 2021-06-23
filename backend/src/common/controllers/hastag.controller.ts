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
import { HastagDto } from 'src/common/dto';
import { HastagProvider } from 'src/common/providers';
import { response } from 'src/shared';

@Controller('admin')
export class HastagController {
  constructor(private readonly hastagProvider: HastagProvider) {}

  @Post('hastag')
  async createHastag(@Body() body: HastagDto): Promise<object> {
    let objectData: object = await this.hastagProvider.create(body);

    return response(objectData);
  }

  @Put('hastag/:hastagId')
  async updateHastag(
    @Param() params,
    @Body() body: HastagDto,
  ): Promise<object> {
    let objectData: object = await this.hastagProvider.update(
      params.hastagId,
      body,
    );

    return response(objectData);
  }

  @Get('/hastag')
  async getHastag(@Query() query): Promise<object> {
    let objectData: object = await this.hastagProvider.get(query);

    return response(objectData);
  }

  @Delete('/hastag/:hastagId')
  async deleteHastag(@Param() params): Promise<object> {
    let objectData: object = await this.hastagProvider.delete(params.hastagId);

    return response(objectData);
  }
}
