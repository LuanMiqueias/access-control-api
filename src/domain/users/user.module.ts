import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './enterprise/user.entity';
import { CreateUserUseCase } from './application/use-cases/create-user';
import { UserRepository } from './application/repositories/user.repository';
import { TypeOrmUserRepository } from 'src/infra/database/typeorm/repositories/typeorm-user.repository';
import { RoleRepository } from '../roles/repositories/role.repository';
import { TypeOrmRoleRepository } from 'src/infra/database/typeorm/repositories/typeorm-role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [
    {
      provide: UserRepository,
      useClass: TypeOrmUserRepository,
    },
    {
      provide: RoleRepository,
      useClass: TypeOrmRoleRepository,
    },
    CreateUserUseCase,
  ],
  exports: [UserRepository, RoleRepository],
})
export class UserModule {}
