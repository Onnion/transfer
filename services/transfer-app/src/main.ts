import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const { TRANSFER_APP_PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(TRANSFER_APP_PORT);
}
bootstrap();
