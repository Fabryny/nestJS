import { CommonEntity } from "src/common/common-entity";
import { Role } from "src/role/entities/role.entity";
import { UserRole } from "src/user-role/user-role.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, Unique } from "typeorm";
import { UserInterface } from "../interfaces";

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User extends CommonEntity implements UserInterface {

    @Column({type: 'citext', nullable: false})
    id: string;

    @Column({type: 'text', nullable: false, default: null})
    username: string;

    @Column({type: 'text', nullable: false})
    password: string;

    @Column({type: 'citext', nullable: true})
    salt: string;
    
    @Column({type: 'citext', nullable: true})
    firstName: string;
    
    @Column({type: 'citext', nullable: true})
    lastName: string;
    
    @Column({type: 'citext'})
    email: string;
    
    @Column({default: true, nullable: false})
    active: boolean;

    @OneToMany(() => UserRole, (userRole) => userRole.user)
    userRoles?: UserRole[];

/*     @ManyToMany(() => Role, (role) => role.users, {
        cascade: true
    })
    @JoinTable()
    roles!: Role[]; */
}
