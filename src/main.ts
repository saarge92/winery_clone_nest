import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';

(async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors();
  await app.listen(PORT);
})();

