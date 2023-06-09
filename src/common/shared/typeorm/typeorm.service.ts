import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get<string>('DATABASE_HOST'),
      port: this.config.get<number>('DATABASE_PORT'),
      database: this.config.get<string>('DATABASE_NAME'),
      username: this.config.get<string>('DATABASE_USER'),
      password: this.config.get<string>('DATABASE_PASSWORD'),
      entities: ['src/module/**/*.entity.{ts, js}'],
      migrations: ['src/common/migration/*.{ts, js}'],
      migrationsTableName: 'typeorm_migrations',
      logging: true,
      logger: 'advanced-console',
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}

export { TypeOrmConfigService };
