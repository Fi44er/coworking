import { ApiProperty } from "@nestjs/swagger"

export class RoomResponse {
    @ApiProperty()
    address: string

    @ApiProperty()
    name: string

    @ApiProperty()
    description: string

    @ApiProperty()
    price: number

    @ApiProperty()
    places: number
}