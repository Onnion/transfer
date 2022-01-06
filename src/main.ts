import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const { TRANSFER_APP_PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: false,
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validateCustomDecorators: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Serviço de transferências')
    .setDescription('Serviço de transferências feito para desafio BTG-Pactual')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/doc/', app, document);

  await app.listen(+TRANSFER_APP_PORT);
}
bootstrap();
