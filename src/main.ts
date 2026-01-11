// panase-backend/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // ConfigService'i import edin

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true }); // CORS'u etkinleştirin

  const configService = app.get(ConfigService); // ConfigService'i al
  const port = configService.get<number>('PORT') || 3001; // Portu .env'den al

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO'da tanımlı olmayan alanları filtreler
      forbidNonWhitelisted: true, // DTO'da tanımlı olmayan alanlar gelirse hata fırlatır
      transform: true, // Gelen payload'ı DTO tipine dönüştürür
    }),
  );

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
