import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { CreateUserUseCase } from 'src/domain/users/application/use-cases/create-user';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { Public } from 'src/infra/auth/public';

const CreateUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type CreateUserBodySchema = z.infer<typeof CreateUserBodySchema>;

@Controller('users')
@Public()
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @UsePipes(new ZodValidationPipe(CreateUserBodySchema))
  @Post()
  async createUser(@Body() { email, password }: CreateUserBodySchema) {
    return await this.createUserUseCase.execute({
      email,
      password,
    });
  }
}
