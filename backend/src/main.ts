import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  // config path file env
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.enableCors({
    origin: true,
    credentials: true,
  });
  Logger.log(`Listened on PORT ${process.env.PORT || 5000}`);
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
