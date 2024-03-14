import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { countingTimeEnd } from 'lib/utils/convert-to-time.util';
import { CreateOrderDto } from './DTO/CreateOrder.dto';
import { OrderResponse } from './Response/Order.response';
import { UpdateOrderDto } from './DTO/UpdateOrder.dto';
import { convertStringToTime } from 'lib/utils/convertStringToDate.util';


@Injectable()
export class OrderService {
    constructor(private readonly prismaService: PrismaService) {}

    // ------------------------------ Order ------------------------------ //

    // --------------- Create Order --------------- //
    async createOrder(dto: CreateOrderDto): Promise<OrderResponse> {
        const room = await this.prismaService.room.findUnique({where: {id: dto.roomId}})
        if(!room) throw new BadRequestException('Такой комнаты несуществует')
        const timeEnd = countingTimeEnd(dto.timeStart, dto.duration)

        const existingOrder = await this.checkingFreeTime(new Date(dto.timeStart), timeEnd, dto.roomId)
        if(existingOrder) throw new BadRequestException('Данное время уже занято')

        const payment = +dto.duration * room.price
        const order = await this.prismaService.order.create({
            data: {
                roomId: dto.roomId,
                timeStart: new Date(dto.timeStart),
                timeEnd,
                summaryEvent: dto.summaryEvent,
                fio: dto.fio,
                email: dto.email,
                phoneNumber: dto.phoneNumber,
                payment
            }
        })
        return order
    }

    // --------------- checking for a record for a period of time --------------- //
    private async checkingFreeTime(timeStart: Date, timeEnd: Date, roomId: number): Promise<boolean> {
        const existOrders = await this.prismaService.order.findMany({
            where: {roomId: roomId},
            select: {
                timeStart: true,
                timeEnd: true
            }
        })
        
        let existingStatus = false
        existOrders.forEach(order => {
            const existingTime = timeStart < order.timeEnd && timeEnd > order.timeStart
            if(existingTime) {
                existingStatus = existingTime
                return existingStatus
            }
        });
        return existingStatus
    }


    // ------------------------------ Management Order ------------------------------ //

    // --------------- Update Order --------------- //
    async updateOrder(id: number, dto: UpdateOrderDto): Promise<OrderResponse> {
        const order = await this.prismaService.order.findUnique({where: {id}})
        if(!order) throw new BadRequestException('Такой заявки не существует')

        if(convertStringToTime(dto.timeStart) >= convertStringToTime(dto.timeEnd)) throw new BadRequestException('Некорректно указан промежуток времени')
        const existingOrder = await this.checkingFreeTime(new Date(dto.timeStart), new Date(dto.timeEnd), order.roomId)
        if(existingOrder) throw new BadRequestException('Данное время уже занято')
        return await this.prismaService.order.update({
            where: {id},
            data: {
                timeStart: new Date(dto.timeStart),
                timeEnd: new Date(dto.timeEnd)
            }
        })
    }

    // --------------- Delete Order --------------- //
    async deleteOrder(id: number): Promise<boolean> {
        const order = await this.prismaService.order.findUnique({where: {id}})
        if(!order) return true
        await this.prismaService.order.delete({where: {id}})
        return true
    }
}
