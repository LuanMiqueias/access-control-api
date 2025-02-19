import { Role } from '../enterprise/role.entity';

export abstract class RoleRepository {
  abstract create(user: Role): Promise<Role>;
  abstract findByRoleName(role: string): Promise<Role | null>;
}
