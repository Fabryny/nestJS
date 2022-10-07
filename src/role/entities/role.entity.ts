import { CommonEntity } from "src/common/common-entity";
import { User } from "src/modules/user/entities/user.entity";
import { UserRole } from "src/user-role/user-role.entity";
import { Column, Entity, ManyToMany, OneToMany, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class Role extends CommonEntity {
    @Column()
    name!: string;

    @OneToMany(() => UserRole, userRole => userRole.role)
    userRoles!: UserRole[];

/*     @ManyToMany(() => User, (user) => user.roles)
    users!: User[] */
}
