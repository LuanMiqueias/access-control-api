import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateUserUseCase } from 'src/domain/users/application/use-cases/create-user';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { Public } from 'src/infra/auth/public';
import { PoliciesGuard } from 'src/core/authorization/policies.guard';
import { User } from 'src/domain/users/enterprise/user.entity';
import { AppAbility } from 'src/core/authorization/casl-ability.factory';
import { CheckPolicies } from 'src/core/authorization/policy.decorator';
import { JwtAuthGuard } from 'src/infra/auth/jwt-auth.guard';
import { UserPayload } from 'src/infra/auth/jwt.strategy';
import { CurrentUser } from 'src/infra/auth/current-user-decorator';

const CreateUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
  role: z.string(),
});

type CreateUserBodySchema = z.infer<typeof CreateUserBodySchema>;

@Controller('users')
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @UsePipes(new ZodValidationPipe(CreateUserBodySchema))
  @Post()
  async createUser(@Body() { email, password, role }: CreateUserBodySchema) {
    return await this.createUserUseCase.execute({
      email,
      password,
      role,
    });
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can('manage', User))
  @Get()
  async getUser(@CurrentUser() user: UserPayload) {
    return user;
  }
}
