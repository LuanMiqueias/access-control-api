import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/domain/users/application/repositories/user.repository';
import { hash } from 'bcryptjs';
import { WrongCredentialsError } from 'src/core/exceptions/custom-exceptions';
import { User } from '../../enterprise/user.entity';
import { HashComparer } from '../cryptography/hash-comparer';
import { Encrypter } from '../cryptography/encrypter';

interface CreateUserRequest {
  email: string;
  password: string;
}
interface CreateUserResponse {
  accessToken: string;
}

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new WrongCredentialsError();
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new WrongCredentialsError();
    }
    const payload = { sub: user?.id, roles: user?.roles };
    const accessToken = await this.encrypter.encrypt(payload);

    return {
      accessToken,
    };
  }
}
