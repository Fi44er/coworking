import { Body, Controller, Get, Param, Post, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { Public } from "lib/decorators/public.decorator";
import { RoomService } from "./room.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { AddRoomDto } from "./DTO/AddRoom.dto";
import { Response } from "express";

@Public()
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  // --------------- Add Room --------------- //
  @Post('add-room')
  async addRoom(@Body() dto: AddRoomDto) {
    return this.roomService.addRoom(dto)
  }

  // --------------- Upload Image --------------- //
  @Post('upload-image/:id')
  @UseInterceptors(FilesInterceptor('image'))
  async uploadImage(@Param('id') roomId: string, @UploadedFiles() files: Express.Multer.File[]) {
    console.log(roomId)
    return this.roomService.uploadImage(Number(roomId), files)
  }

  @Get('get-names-picture-by-room-id/:id')
  async getPicturesByRoomId(@Param('id') roomId: string) {
    return this.roomService.getPicturesByRoomId(Number(roomId))
  }

  @Get("get-picture-by-name/:name")
  async getPicture(@Param("name") filename: string, @Res() res: Response) {
    res.sendFile(filename, { root: 'uploads'});
  }
}