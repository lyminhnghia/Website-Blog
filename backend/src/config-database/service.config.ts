import { Injectable, Logger } from '@nestjs/common';
import { configEnv as environmentDev } from './dev.config';

@Injectable()
export class ConfigService {
  public environment;
  public ormConfig;

  constructor() {
    Logger.log(`Configuration : ${process.env.ENV || 'DEV'}`);
    this.environment = environmentDev;
  }
}
