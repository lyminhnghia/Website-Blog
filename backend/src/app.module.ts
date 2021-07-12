import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from 'src/common/guards';
import { ConfigModule, ConfigService } from 'src/config-database';
import {
  CategoryModule,
  HastagModule,
  BlogModule,
  UserModule,
  AuthModule,
} from 'src/common/modules';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.environment.database.host,
        port: configService.environment.database.port,
        username: configService.environment.database.username,
        password: configService.environment.database.password,
        database: configService.environment.database.database,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.environment.database.synchronize,
        charset: 'utf8mb4',
        logging: true,
      }),
      inject: [ConfigService],
    }),
    CategoryModule,
    HastagModule,
    BlogModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
