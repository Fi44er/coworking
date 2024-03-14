import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreateAdminDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    login: string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string
}