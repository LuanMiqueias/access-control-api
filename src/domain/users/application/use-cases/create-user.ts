import { Injectable } from '@nestjs/common';
import { User } from '../../enterprise/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { hash } from 'bcryptjs';
import {
  ResourceNotFound,
  UserAlreadyExists,
} from 'src/core/exceptions/custom-exceptions';
import { RoleRepository } from 'src/domain/roles/repositories/role.repository';

interface CreateUserDTO {
  email: string;
  password: string;
  role: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
  ) {}

  async execute({ email, password, role }: CreateUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    const existingRole = await this.roleRepository.findByRoleName(role);

    if (existingUser) {
      throw new UserAlreadyExists();
    }
    if (!existingRole) {
      throw new ResourceNotFound(role);
    }

    const hashedPassword = await hash(password, 10);

    const user = new User();
    user.email = email;
    user.password = hashedPassword;
    user.roles = [existingRole];

    return await this.userRepository.create(user);
  }
}
