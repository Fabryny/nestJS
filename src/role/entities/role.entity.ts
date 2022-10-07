import { CommonEntity } from "src/common/common-entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class Role extends CommonEntity {
    @Column()
    name!: string;
}
