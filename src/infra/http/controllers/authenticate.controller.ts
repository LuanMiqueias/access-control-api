import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { z } from 'zod';
import { Public } from '@/infra/auth/public';
import { WrongCredentialsError } from 'src/core/exceptions/custom-exceptions';
import { AuthenticateUserUseCase } from 'src/domain/users/application/use-cases/authenticate-user';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller('/auth')
@Public()
export class AuthenticateController {
  constructor(private authenticateUser: AuthenticateUserUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;

    try {
      const { accessToken } = await this.authenticateUser.execute({
        email,
        password,
      });

      return {
        accessToken: accessToken,
      };
    } catch (err) {
      console.log(err);
      switch (err.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(err.message);
        default:
          throw new BadRequestException(err.message);
      }
    }
  }
}
