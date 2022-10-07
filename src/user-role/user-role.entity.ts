import { CommonEntity } from 'src/common/common-entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { Entity, Column, Unique, ManyToOne } from 'typeorm';
import { UserRoleInterface } from './interfaces';

@Entity()
@Unique(['userId', 'roleId'])
export class UserRole extends CommonEntity implements UserRoleInterface {
  @Column()
  userId!: string;

  @Column()
  roleId!: string;

  @ManyToOne(() => User, user => user.userRoles)
  user!: User;

  @ManyToOne(() => Role, role => role.userRoles)
  role!: Role;
}
