import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './controllers/user.controller';
import { CreateUserUseCase } from 'src/domain/users/application/use-cases/create-user.use-case';
import { UserModule } from 'src/domain/users/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [UserController],
  providers: [CreateUserUseCase],
})
export class HttpModule {}
