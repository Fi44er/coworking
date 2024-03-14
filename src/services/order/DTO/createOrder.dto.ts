import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
    @ApiProperty()
    @IsNumber()
    roomId: number

    @ApiProperty()
    @IsString()
    timeStart: string

    @ApiProperty()
    @IsString()
    duration: string

    @ApiProperty()
    @IsString()
    summaryEvent: string

    @ApiProperty()
    @IsString()
    fio: string

    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsNumber()
    phoneNumber: number
}