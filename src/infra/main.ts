import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  });

  const port = process.env.PORT ?? 3333;

  await app.listen(port);
}
bootstrap();
