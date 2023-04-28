import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config({
  path: __dirname + '/src/common/env/.env',
});

const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  database: 'ecommerce',
  username: 'postgres',
  password: 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/common/migration/*.js'],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
});

export default dataSource;
