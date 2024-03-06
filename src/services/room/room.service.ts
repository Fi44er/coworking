import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddRoomDto } from './DTO/AddRoom.dto';

@Injectable()
export class RoomService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    async AddRoom(dto: AddRoomDto, files: Express.Multer.File) {
    }
}
