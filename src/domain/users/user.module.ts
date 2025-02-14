import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './enterprise/user.entity';
import { CreateUserUseCase } from './application/use-cases/create-user';
import { UserRepository } from './application/repositories/user.repository';
import { TypeOrmUserRepository } from 'src/infra/database/typeorm/repositories/user-typeorm.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [
    {
      provide: UserRepository,
      useClass: TypeOrmUserRepository,
    },
    CreateUserUseCase,
  ],
  exports: [UserRepository],
})
export class UserModule {}
