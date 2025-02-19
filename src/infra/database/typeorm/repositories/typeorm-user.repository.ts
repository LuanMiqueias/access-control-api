import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/users/application/repositories/user.repository';
import { User } from 'src/domain/users/enterprise/user.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  private ormRepository: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.ormRepository = this.dataSource.getRepository(User);
  }

  async create(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.ormRepository.findOne({
      where: { email },
      relations: { roles: true, permissions: true },
    });
  }

  async findById(id: string): Promise<User | null> {
    return await this.ormRepository.findOne({ where: { id } });
  }

  async update(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
