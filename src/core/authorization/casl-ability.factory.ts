import {
  Ability,
  AbilityBuilder,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/domain/roles/enterprise/role.entity';
import { User } from 'src/domain/users/enterprise/user.entity';

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';
export type Subjects = InferSubjects<typeof User | typeof Role> | 'all';

export type AppAbility = PureAbility<[Actions, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      PureAbility<[Actions, Subjects]>
    >(Ability);

    if (user.roles.find((role) => role?.name.includes('ADMIN'))) {
      can('manage', 'all');
    } else {
      can('read', User);
      can('update', User, { id: user.id });
      cannot('delete', User);
    }

    return build();
  }
}
