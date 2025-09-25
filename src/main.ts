import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { setupMetrics } from './infrastructure/metrics/metrics';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupMetrics(app);
  await app.listen(3000);
  Logger.log('🚀 Application is running on: http://localhost:3000');
}
bootstrap();
