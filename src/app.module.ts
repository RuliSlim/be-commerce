import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from '@root/app.service';
import { AppController } from '@root/app.controller';
import { TypeOrmConfigService } from '@common/shared/typeorm/typeorm.service';
import { getEnvPath } from '@common/helper/env.helper';
import { ProductModule } from './module/product/product.module';

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
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
