import { ApiProperty } from "@nestjs/swagger"

export class OrderResponse {
    @ApiProperty()
    id: number
    
    @ApiProperty()
    roomId: number
    
    @ApiProperty()
    timeStart: Date
    
    @ApiProperty()
    timeEnd: Date
    
    @ApiProperty()
    summaryEvent: string
    
    @ApiProperty()
    fio: string
    
    @ApiProperty()
    phoneNumber: string
    
    @ApiProperty()
    status: string
    
    @ApiProperty()
    payment: number
}