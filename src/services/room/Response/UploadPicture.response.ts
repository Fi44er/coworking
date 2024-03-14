import { ApiProperty } from "@nestjs/swagger"

export class UploadPictureResponse {
    @ApiProperty()
    roomId: number

    @ApiProperty()
    name: string
}