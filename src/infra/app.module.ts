import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { HttpModule } from './http/http.module';
import { EnvModule } from './env/env.module';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from 'src/core/authorization/casl.module';
import { CryptographyModule } from './cryptography/cryptography.module';
import { envSchema } from './env/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: (env) => envSchema.parse(env),
    }),

    HttpModule,
    AuthModule,
    CaslModule,
  ],
})
export class AppModule {}
