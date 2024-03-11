import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { Public } from "lib/decorators/public.decorator";
import { RoomService } from "./room.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { AddRoomDto } from "./DTO/AddRoom.dto";
import { Response } from "express";

@Public()
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  // ------------------------------ Room ------------------------------ //

  // --------------- Add Room --------------- //
  @Post('add-room')
  async addRoom(@Body() dto: AddRoomDto & { id: number }) {
    return this.roomService.addRoom(dto)
  }

  // --------------- Get Room --------------- //
  @Get('get-room/:id')
  async getRoom(@Param('id') roomId: string) {
    return this.roomService.getRoom(+roomId)
  }

  // --------------- Update Room --------------- //
  @Put('update-room')
  async updateRoom(@Body() dto: AddRoomDto & { id: number }) {
    if(!dto.id) throw new BadRequestException('Не передан идентификатор комнаты')
    return this.roomService.addRoom(dto)
  }

  // --------------- Delete Room --------------- //
  @Delete('delete-room/:id')
  async deleteRoom(@Param('id') roomId: string) {
    return this.roomService.deleteRoom(+roomId)
  }


  // ------------------------------ Picture ------------------------------ //

  // --------------- Upload Picture --------------- //
  @Post('upload-picture/:id')
  @UseInterceptors(FilesInterceptor('image'))
  async uploadPicture(@Param('id') roomId: string, @UploadedFiles() files: Express.Multer.File[]) {
    console.log(roomId)
    return this.roomService.uploadPicture(+roomId, files)
  }

  // --------------- Get Names picture by room id --------------- //
  @Get('get-names-picture-by-room-id/:id')
  async getNamesPictureByRoomId(@Param('id') roomId: string) {
    return this.roomService.getPicturesByRoomId(+roomId)
  }

  // --------------- Get Picture by name --------------- //
  @Get("get-picture-by-name/:name")
  async getPicture(@Param("name") filename: string, @Res() res: Response) {
    res.sendFile(filename, { root: 'uploads'});
  }

  // --------------- Delete Picture by id --------------- //
  @Delete('delete-picture/:id')
  async deletePicture(@Param('id') pictureId: string) {
    return this.roomService.deletePicture(+pictureId)
  }
  
}