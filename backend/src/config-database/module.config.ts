import { Global, Module } from '@nestjs/common';
import { ConfigService } from './service.config';

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
