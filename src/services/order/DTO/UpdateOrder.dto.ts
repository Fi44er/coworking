import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateOrderDto {
    @ApiProperty()
    @IsString()
    timeStart: string

    @ApiProperty()
    @IsString()
    timeEnd: string
}