// photo.service.ts
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { existsSync, readFile, readFileSync, writeFile } from 'fs';
import { access, mkdir, rm } from 'fs/promises';
import { join } from 'path';
import { v4 } from 'uuid'
import { CreateRoomDto } from './DTO/CreateRoom.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetPicturesNameResponse } from './Response/GetPicturesName.response';
import { RoomResponse } from './Response/Room.response.dto';

const uploadFolder = join(__dirname, '../../../uploads')
@Injectable()
export class RoomService {
  constructor(private readonly prismaService: PrismaService) {}


  // ------------------------------ Room ------------------------------ //

  // --------------- Add Room --------------- //
  async addRoom(dto: CreateRoomDto): Promise<RoomResponse> {
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

  // --------------- Get All Rooms --------------- //
  async getAllRooms(): Promise<RoomResponse[]> {
    const rooms = await this.prismaService.room.findMany({
      include: {
        picture: {
          select: {
            name: true
          }
        }
      }
    })
    return rooms
  }

  // --------------- Update Room --------------- //
  async updateRoom(id: number, dto: Partial<CreateRoomDto>): Promise<RoomResponse> {
    const existRoom = await this.prismaService.room.findUnique({where: {id}})
    if(!existRoom) throw new BadRequestException('Такой комнаты не существует')
    const room = await this.prismaService.room.update({
      where: {id: id},
      data: {
        address: dto?.address,
        name: dto?.name,
        description: dto?.description,
        price: dto?.price,
        places: dto?.places
      }
    })
    return room
  }

  // --------------- Get Room by id --------------- //
  async getRoom(roomId: number): Promise<RoomResponse> {
    const room = await this.prismaService.room.findFirst({
      where: {id: roomId},
      include: {
        picture: {
          select: {
            name: true
          }
        }
      }
    })
    return room
  }

  // --------------- Delete Room by id --------------- //
  async deleteRoom(roomId: number): Promise<boolean> {
    const room = await this.prismaService.room.findUnique({where: {id: roomId}})
    if(!room) throw new BadRequestException('Такого помещения не существует')
    await this.prismaService.room.delete({where: {id: roomId}})
    return true
  }

  // ------------------------------ Picture ------------------------------ //

  // --------------- Upload Image --------------- //
  async uploadPicture(roomId: number, files: Express.Multer.File[]): Promise<GetPicturesNameResponse[]> {

    const room = await this.prismaService.room.findUnique({where: {id: roomId}})
    if(!room) throw new BadRequestException('Такого помещения не существует')

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
        writeFile(join(uploadFolder, newname), file.buffer, (error) => {
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

  // --------------- Delete Picture by id --------------- //
  async deletePicture(pictureName: string): Promise<boolean> {
    const existFile = existsSync(uploadFolder + '/' + pictureName)
    if(!existFile) throw new BadRequestException('Такого файла не существует')
    const puthToFile = uploadFolder + '/' + pictureName
    rm(puthToFile)
    await this.prismaService.picture.delete({where: {name: pictureName}})
    return true
  }
}