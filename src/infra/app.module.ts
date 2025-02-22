import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from './http/http.module';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from 'src/core/authorization/casl.module';
import { envSchema } from './env/env';
import { LoggerModule } from 'src/core/logging/logger.module';
import { AppLogger } from 'src/core/logging/logger.service';
import { EnvModule } from './env/env.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    HttpModule,
    AuthModule,
    CaslModule,
    LoggerModule,
    EnvModule,
  ],
  providers: [AppLogger],
  exports: [AppLogger],
})
export class AppModule {}
