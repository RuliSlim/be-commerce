import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';

dotenv.config({
  path: __dirname + '/src/common/env/.env',
});

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'ecommerce',
  username: 'postgres',
  password: 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/common/migration/*.js'],
  synchronize: false,
});

export default dataSource;
