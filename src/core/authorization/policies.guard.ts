import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from './casl-ability.factory';
import { User } from 'src/domain/users/enterprise/user.entity';
import { CHECK_POLICIES_KEY, PolicyHandler } from './policy.decorator';
import { AppLogger } from '../logging/logger.service';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private logger: AppLogger,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    const ability = this.caslAbilityFactory.createForUser(user);

    const isAllowed = policyHandlers.every((handler) => handler(ability));

    if (!isAllowed) {
      this.logger.warn('Acesso negado');
      throw new ForbiddenException('Acesso negado');
    }

    return isAllowed;
  }
}
