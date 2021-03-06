import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';

import { AppModule } from './app.module';

dotenvConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      always: true,
      enableDebugMessages: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      // disableErrorMessages: true,
    })
  );
  app.enableCors();
  await app.listen(process.env.PORT);
}

bootstrap();
