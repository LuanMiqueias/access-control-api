import { Injectable } from '@nestjs/common';
import { User } from '../../enterprise/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { hash } from 'bcryptjs';
import { UserAlreadyExists } from 'src/core/exceptions/custom-exceptions';

interface CreateUserDTO {
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: CreateUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new UserAlreadyExists();
    }

    const hashedPassword = await hash(password, 10);

    const user = new User();
    user.email = email;
    user.password = hashedPassword;

    return await this.userRepository.create(user);
  }
}
