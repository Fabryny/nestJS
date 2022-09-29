import { UserCreateableInterface } from "../interfaces/user-creatable.interface";

export class CreateUserDto implements UserCreateableInterface {
    username!: string;
    password!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
}
