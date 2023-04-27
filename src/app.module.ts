import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '@common/shared/typeorm/typeorm.service';
import { getEnvPath } from '@common/helper/env.helper';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestContextModule } from 'nestjs-request-context';

// module
import { StoreModule } from '@module/store/store';
import { CategoryModule } from '@module/category/category';
import { AdminModule } from '@module/user/user';
import { AuthModule } from './module/auth/auth.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/env`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    RequestContextModule,
    StoreModule,
    CategoryModule,
    AdminModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
