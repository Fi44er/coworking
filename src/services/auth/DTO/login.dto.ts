import { ApiProperty } from "@nestjs/swagger";
import { IsNegative, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginAdminDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    login: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string
}