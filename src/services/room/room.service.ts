// photo.service.ts
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { error } from 'console';
import { writeFile, writeFileSync } from 'fs';
import { access, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 } from 'uuid'
import { AddRoomDto } from './DTO/AddRoom.dto';

@Injectable()
export class RoomService {
  async addRoom(dto: AddRoomDto, files: Express.Multer.File[]) {
    console.log(files)
    return this.uploadImage(files)
  }

  private async uploadImage(files: Express.Multer.File[]) {
    const uploadFolder = join(__dirname, '..', '..', '..', '..', '/uploads')

    try {
      await access(uploadFolder)
    } catch(e) {
      await mkdir(uploadFolder, { recursive: true })  
    }

    let arrNames = []
    await Promise.all(
      files.map(async (file) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
          return new BadRequestException('Загружаемый файл должен быть типа: jpg, jpeg, png, webp)')
        }
        const newname = `${v4()}.${file.originalname.split('.')[1]}`
        await writeFile(join(uploadFolder, newname), file.buffer, (error) => {
          if(error) throw new InternalServerErrorException('Ошибка при записи фото')
        })
        arrNames.push(newname)
      })
    )

    if(arrNames.length === 0) {
      throw new BadRequestException('Загружаемый файл должен быть определенного типа(jpg, jpeg, png, webp))')
    }else {
      return arrNames
    }
  }
  
}