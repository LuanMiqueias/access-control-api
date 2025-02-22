import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import DatadogWinston from 'datadog-winston';
import { EnvService } from 'src/infra/env/env.service';

@Injectable()
export class AppLogger implements LoggerService {
  private logger: winston.Logger;

  constructor(config: EnvService) {
    console.log('config', config);
    this.logger = winston.createLogger({
      level: 'info',
      exitOnError: false,
      format: winston.format.json(),

      transports: [
        new winston.transports.File({
          filename: `/var/log/datadog/custom_logs/log.log`,
        }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.printf(({ level, message, timestamp }) => {
              return `[${timestamp}] ${level}: ${message}`;
            }),
          ),
        }),
        new DatadogWinston({
          apiKey: config.get('DATADOG_API_KEY'),
          hostname: config.get('DATADOG_HOSTNAME'),
          service: 'access-control-api',
          ddsource: 'nodejs',
        }),
      ],
    });

    this.logger.info('Testando logs para Datadog');
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(message, { trace });
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
