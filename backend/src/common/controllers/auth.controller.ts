import {
  Body,
  Controller,
  Post,
  Put,
  Get,
  Param,
  Res,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import {
  LoginDto,
  JwtDto,
  ProfileDto,
  ChangePasswordDto,
} from 'src/common/dto';
import { AuthProvider } from 'src/common/providers';
import { Enum, response } from 'src/shared';
import { Roles, AuthUser } from 'src/common/decorators';
import { editFileName, imageFileFilter } from 'src/shared';

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

  @Put('profile')
  @Roles(Enum.Role.admin, Enum.Role.manager, Enum.Role.user)
  async updateProfile(
    @AuthUser() user: JwtDto,
    @Body() body: ProfileDto,
  ): Promise<object> {
    let objectData: object = await this.authProvider.updateProfile(
      user.id,
      body,
    );

    return response(objectData);
  }

  @Put('change-password')
  @Roles(Enum.Role.admin, Enum.Role.manager, Enum.Role.user)
  async updatePassword(
    @AuthUser() user: JwtDto,
    @Body() body: ChangePasswordDto,
  ): Promise<object> {
    let objectData: object = await this.authProvider.updatePassword(
      user.id,
      body,
    );

    return response(objectData);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Roles(Enum.Role.admin, Enum.Role.manager, Enum.Role.user)
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<object> {
    return response({
      data: {
        originalname: file.originalname,
        filename: file.filename,
      },
      status: HttpStatus.OK,
    });
  }

  @Get('image/:image_name')
  seeUploadedFile(@Param('image_name') image, @Res() res) {
    return res.sendFile(image, { root: './images' });
  }
}
