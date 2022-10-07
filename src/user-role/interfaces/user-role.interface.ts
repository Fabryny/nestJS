import { CommonEntityInterface } from "src/common/interfaces/common-entity-interface";


export interface UserRoleInterface extends CommonEntityInterface {
  userId: string;
  roleId: string;
}
