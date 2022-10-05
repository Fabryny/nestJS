import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";
import { IsStrongPassword } from "src/common/decorators/is-strong-password";
import { UserCreateableInterface } from "../interfaces/user-creatable.interface";

export class CreateUserDto implements UserCreateableInterface {
    @ApiProperty({
        type: 'string',
        description: 'username to access application'
    })
    @IsString()
    username!: string;
    
    @ApiProperty({
        type: 'string',
        description: 'password to access application'
    })
    @IsString()
    @IsStrongPassword()
    password!: string;
    
    @ApiProperty({
        type: 'string',
        description: 'firstname of user'
    })
    @IsString()
    @IsOptional()
    firstName!: string;
    
    @ApiProperty({
        type: 'string',
        description: 'lastname of user'
    })
    @IsString()
    @IsOptional()
    lastName!: string;

    @ApiProperty({
        type: 'string',
        description: 'email of user'
    })
    @IsString()
    @IsEmail()
    email!: string;
}
