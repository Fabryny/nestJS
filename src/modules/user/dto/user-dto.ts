import { UserInterface } from "../interfaces/user.interface";

export class UserDto implements UserInterface {
    id: number;
    createdAt: Date;
    updateAt: Date;
    username: string;
    password: string;
    salt: string;
    firstName: string;
    lastName: string;
    email: string;
    active: boolean;
}