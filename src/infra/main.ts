import './tracer';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from 'src/core/logging/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3333;

  const logger = app.get(AppLogger);
  logger.log('Aplicação iniciada com sucesso!');

  await app.listen(port);
}
bootstrap();
