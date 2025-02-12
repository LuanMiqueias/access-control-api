import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/users/application/repositories/user.repository';
import { User } from 'src/domain/users/enterprise/user.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user?.email === email) || null;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user?.id === id) || null;
  }

  async update(user: User): Promise<User> {
    const newUsers = this.users.map((userToUpdate) => {
      if (userToUpdate?.id === user?.id) {
        return {
          ...userToUpdate,
          ...user,
        };
      }
      return userToUpdate;
    });
    this.users = newUsers;

    return user;
  }

  async delete(id: string): Promise<void> {
    const newUsers = this.users
      .map((userToUpdate) => {
        if (userToUpdate?.id === id) {
          return;
        }
        return userToUpdate;
      })
      .filter((item) => !!item);
    this.users = newUsers;

    return;
  }
}
