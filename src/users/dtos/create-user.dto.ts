import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength } from "class-validator";
import { Role } from "src/enums/role.enum";
export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    password: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    username: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNo: string;

    role: Role

}