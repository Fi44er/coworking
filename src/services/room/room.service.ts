// photo.service.ts
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { error } from 'console';
import { writeFile, writeFileSync } from 'fs';
import { access, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 } from 'uuid'
import { AddRoomDto } from './DTO/AddRoom.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private readonly prismaService: PrismaService) {}

  // --------------- Add Room --------------- //
  async addRoom(dto: AddRoomDto) {
    const room = await this.prismaService.room.create({
      data: {
        address: dto.address,
        name: dto.name,
        description: dto.description,
        price: dto.price,
        places: dto.places
      }
    })

    return room
  }

















  // --------------- Upload Image --------------- //
  async uploadImage(roomId: number, files: Express.Multer.File[]) {
    const uploadFolder = join(__dirname, '../../../../uploads')

    try {
      await access(uploadFolder)
    } catch(e) {
      await mkdir(uploadFolder, { recursive: true })  
    }

    if (!files || files.length === 0) {
      return [];
    }

    let picturesName = []
    await Promise.all(
      files.map(async (file) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
          return
        }
        const newname = `${v4()}.${file.originalname.split('.')[1]}`
        await writeFile(join(uploadFolder, newname), file.buffer, (error) => {
          if(error) throw new InternalServerErrorException('Ошибка при записи фото')
        })
        picturesName.push({roomId: roomId, name: newname})
      })
    )

    if(picturesName.length === 0) {
      throw new BadRequestException('Загружаемый файл должен быть определенного типа(jpg, jpeg, png, webp))')
    }else {
      await this.prismaService.picture.createMany({data: picturesName})
      return picturesName
    }
  }  

  async getPicturesByRoomId(roomId: number) {
    return await this.prismaService.picture.findMany({
      where: {roomId: roomId},
      select: {
        name: true
      }
    })
  }
}