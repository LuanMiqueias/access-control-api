import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from '../../users/enterprise/user.entity';
import { Role } from '../../roles/enterprise/role.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.permissions)
  users: User[];

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
