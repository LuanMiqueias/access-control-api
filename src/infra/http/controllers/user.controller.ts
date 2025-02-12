import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/domain/users/application/use-cases/create-user.use-case';

interface CreateUserDTO {
  email: string;
  password: string;
  isAdmin?: boolean;
}

@Controller('users')
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  async createUser(@Body() data: CreateUserDTO) {
    // return await this.createUserUseCase.execute(data);
  }
  @Get()
  async getUser(@Body() data: CreateUserDTO) {
    return await this.createUserUseCase.execute(data);
  }
}
