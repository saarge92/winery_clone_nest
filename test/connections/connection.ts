import { ConnectionOptions } from 'typeorm';
import 'dotenv/config';

export function getConnectionParameters(entities: Array<any>): ConnectionOptions {
  return {
    ...connectionParameters,
    entities: [...entities],
    name: connectionName,
  };
}

export const connectionName = 'winery-test';

export const connectionParameters: any = {
  type: process.env.TEST_DATABASE_DRIVER,
  database: process.env.TEST_DATABASE_NAME,
  host: process.env.TEST_DATABASE_HOST,
  port: process.env.TEST_DATABASE_PORT,
  username: process.env.TEST_USER_NAME,
  password: process.env.TEST_DATABASE_PASSWORD,
  dropSchema: false,
  synchronize: true,
  logging: false,
};