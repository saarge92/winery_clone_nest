import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

(async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(path.join(__dirname, '/../public/vines/'));
  app.use(helmet());
  app.enableCors();
  await app.listen(PORT);
})();

