import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExists extends HttpException {
  constructor() {
    super(
      { statusCode: HttpStatus.CONFLICT, message: 'User already exists' },
      HttpStatus.CONFLICT,
    );
  }
}

export class ResourceNotFound extends HttpException {
  constructor(resource: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Resource not found - ${resource}`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
