import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true // Will erase any data that isn't expected in the DTO. Prevents a user from trying to "force" data in.
    })
  );
  await app.listen(3000);
}
bootstrap();
