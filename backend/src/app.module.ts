import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from 'src/config-database';
import { CategoryModule } from 'src/common/modules';

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
      }),
      inject: [ConfigService],
    }),
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
