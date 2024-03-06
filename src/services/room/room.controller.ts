import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AddRoomDto } from './DTO/AddRoom.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'lib/utils/image-upload';
import { Public } from 'lib/decorators/public.decorator';

@Public()
@Controller('room')
export class RoomController {
    @Post('add-room')
        @UseInterceptors(
            FilesInterceptor('image', 10, {
                storage: diskStorage({
                destination: './uploads',
                filename: editFileName,
                }),
                fileFilter: imageFileFilter,
            }),
        )
    async AddRoom(files: Express.Multer.File) {
        return {files}
    }     
}
