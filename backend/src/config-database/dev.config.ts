import * as dotenv from 'dotenv';
import * as path from 'path';

// config path file env
dotenv.config({ path: path.resolve('../.env') });

export const configEnv = {
  secretKey: 'm8inh8sdv5Tng@hib9am<f2u+4M',
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.MYSQL_USER_ACCOUNT,
    password: process.env.MYSQL_USER_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: false,
  },
};
