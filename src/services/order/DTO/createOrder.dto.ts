import { IsDate, IsEmail, IsNumber, IsString, Length, MaxLength, MinLength } from "class-validator";

export class CreateOrderDto {
    @IsNumber()
    roomId: number

    @IsString()
    timeStart: string

    @IsString()
    duration: string

    @IsString()
    summaryEvent: string

    @IsString()
    fio: string

    @IsEmail()
    email: string

    @IsNumber()
    phoneNumber: number
}