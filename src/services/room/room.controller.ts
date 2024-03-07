import { Body, Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { Public } from "lib/decorators/public.decorator";
import { RoomService } from "./room.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { AddRoomDto } from "./DTO/AddRoom.dto";

@Public()
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('add-room')
  @UseInterceptors(FilesInterceptor('image'))
  async addRoom(@Body() dto: AddRoomDto, @UploadedFiles() files: Express.Multer.File[]) {
    return this.roomService.addRoom(dto, files)
  }
}