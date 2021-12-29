import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieSession from 'cookie-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['asfkasfkaowp'], //für die verschlüsselung
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //erlaubt nur was in den DTO's steht
    }),
  );
  await app.listen(3000);
}
bootstrap();
