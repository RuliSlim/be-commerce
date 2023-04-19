import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({
  path: __dirname + '/src/common/env/.env',
});

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  entities: ['src/module/**/*.entity{.ts,.js}'],
  migrations: ['src/common/migration/*.ts'],
  synchronize: false,
});
