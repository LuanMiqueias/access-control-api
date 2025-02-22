import { Module } from '@nestjs/common';
import { AppLogger } from './logger.service';
import { EnvModule } from 'src/infra/env/env.module';

@Module({
  imports: [EnvModule],
  providers: [AppLogger, EnvModule],
  exports: [AppLogger],
})
export class LoggerModule {}
