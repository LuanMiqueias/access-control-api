import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './controllers/user.controller';
import { CreateUserUseCase } from 'src/domain/users/application/use-cases/create-user';
import { UserModule } from 'src/domain/users/user.module';
import { AuthenticateUserUseCase } from 'src/domain/users/application/use-cases/authenticate-user';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { CaslModule } from 'src/core/authorization/casl.module';
import { LoggerModule } from 'src/core/logging/logger.module';

@Module({
  imports: [
    DatabaseModule,
    CryptographyModule,
    CaslModule,
    UserModule,
    LoggerModule,
  ],
  controllers: [UserController, AuthenticateController],
  providers: [CreateUserUseCase, AuthenticateUserUseCase],
})
export class HttpModule {}
