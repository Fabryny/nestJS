import { CommonEntity } from "src/common/common-entity";
import { Column, Entity, Unique } from "typeorm";
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
}
