import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './controllers/user.controller';
import { CreateUserUseCase } from 'src/domain/users/application/use-cases/create-user';
import { UserModule } from 'src/domain/users/user.module';
import { AuthenticateUserUseCase } from 'src/domain/users/application/use-cases/authenticate-user';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { Encrypter } from 'src/domain/users/application/cryptography/encrypter';
import { HashComparer } from 'src/domain/users/application/cryptography/hash-comparer';
import { HashGenerator } from 'src/domain/users/application/cryptography/hash-generator';
import { PoliciesGuard } from 'src/core/authorization/policies.guard';
import { CaslModule } from 'src/core/authorization/casl.module';

@Module({
  imports: [DatabaseModule, CryptographyModule, CaslModule, UserModule],
  controllers: [UserController, AuthenticateController],
  providers: [CreateUserUseCase, AuthenticateUserUseCase],
})
export class HttpModule {}
