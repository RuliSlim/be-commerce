import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  app.enableVersioning({
    defaultVersion: '1.0',
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const document = new DocumentBuilder()
    .setTitle('E-Commerce API')
    .setDescription('E-Commerce Api Documentation')
    .setVersion('1.0')
    .build();

  const swagger = SwaggerModule.createDocument(app, document);
  SwaggerModule.setup('api', app, swagger, {
    swaggerOptions: {
      showCommonExtensions: true,
    },
  });

  await app.listen(port, () => {
    console.log('server running on: ', config.get<number>('BASE_URL'));
  });
}
bootstrap();
