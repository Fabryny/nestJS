import { IsEmail, IsOptional, IsString } from "class-validator";
import { IsStrongPassword } from "src/common/decorators/is-strong-password";
import { UserCreateableInterface } from "../interfaces/user-creatable.interface";

export class CreateUserDto implements UserCreateableInterface {
    @IsString()
    username!: string;
    
    @IsString()
    @IsStrongPassword()
    password!: string;
    
    @IsString()
    @IsOptional()
    firstName!: string;
    
    @IsString()
    @IsOptional()
    lastName!: string;

    @IsString()
    @IsEmail()
    email!: string;
}
