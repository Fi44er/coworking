import { IsNegative, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginAdminDto {
    @IsNotEmpty()
    @IsString()
    login: string

    @IsNotEmpty()
    @IsString()
    password: string
}