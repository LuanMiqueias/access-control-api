import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../../enterprise/user.entity';
import { UserAlreadyExists } from 'src/core/exceptions/custom-exceptions';
import * as bcrypt from 'bcryptjs';
import { CreateUserUseCase } from './create-user';
import { InMemoryUserRepository } from 'src/infra/database/in-memory/repositories/user-in-memory.repository';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: InMemoryUserRepository;

  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it('Should be able create a new User', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    const user = await createUserUseCase.execute({ email, password });

    expect(user).toBeDefined();
    expect(user.email).toBe(email);
    expect(user.password).not.toBe(password); // Should be cryptograph
  });

  it('Should be show error when create a new user with same email', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    await createUserUseCase.execute({ email, password });

    const existingUser = new User();
    existingUser.email = email;

    await expect(
      createUserUseCase.execute({ email, password }),
    ).rejects.toThrow(UserAlreadyExists);
  });
});
