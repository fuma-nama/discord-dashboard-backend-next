require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import { WEB_URL } from '@/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    maxAge: 40,
    origin: WEB_URL,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'HEAD', 'POST', 'DELETE', 'PATCH'],
  });

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
