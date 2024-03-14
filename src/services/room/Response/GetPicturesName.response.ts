import { ApiProperty } from "@nestjs/swagger";

export class GetPicturesNameResponse {
    @ApiProperty()
    name: string
}