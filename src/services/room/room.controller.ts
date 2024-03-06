import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AddRoomDto } from './DTO/AddRoom.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'lib/utils/image-upload';
import { Public } from 'lib/decorators/public.decorator';
import { RoomService } from './room.service';

@Public()
@Controller('room')
export class RoomController {
    constructor(private readonly photoService: RoomService) {}
    @Post('upload')
  @UseInterceptors(FilesInterceptor('image', 10, {
    storage: diskStorage({
      destination: './uploads',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }))
  async uploadPhotos(@UploadedFiles() files) {
    await this.photoService.savePhotosToServer(files);
    return 'Photos uploaded successfully';
  }
}
