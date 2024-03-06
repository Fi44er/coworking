import { IsArray, IsNumber, IsString } from "class-validator"

export class AddRoomDto {
    @IsString()
    address: string

    @IsString()
    name: string

    @IsString()
    description: string

    @IsNumber()
    price: number
}