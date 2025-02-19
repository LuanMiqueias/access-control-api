import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { RoleRepository } from '../../../../domain/roles/repositories/role.repository';
import { Role } from '../../../../domain/roles/enterprise/role.entity';

@Injectable()
export class TypeOrmRoleRepository implements RoleRepository {
  private ormRepository: Repository<Role>;

  constructor(private dataSource: DataSource) {
    this.ormRepository = this.dataSource.getRepository(Role);
  }

  async create(role: Role): Promise<Role> {
    return this.ormRepository.create(role);
  }

  async findByRoleName(name: string): Promise<Role | null> {
    const role = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return role;
  }
}
