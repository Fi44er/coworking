import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './DTO/createOrder.dto';
import { countingTimeEnd } from 'lib/utils/convert-to-time.util';

@Injectable()
export class OrderService {
    constructor(private readonly prismaService: PrismaService) {}

    // ------------------------------ Order ------------------------------ //

    // --------------- Create Order --------------- //
    async createOrder(dto: CreateOrderDto) {
        const room = await this.prismaService.room.findUnique({where: {id: dto.roomId}})
        if(!room) throw new BadRequestException('Такой комнаты несуществует')
        const timeEnd = countingTimeEnd(dto.timeStart, dto.duration)

        const existingOrder = await this.checkingFreeTime(new Date(dto.timeStart), timeEnd)
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
    private async checkingFreeTime(timeStart: Date, timeEnd: Date) {
        const existOrders = await this.prismaService.order.findMany({
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
    async updateOrder(id: number, dto: CreateOrderDto) {
        const order = this.prismaService.order.findUnique({where: {id}})
        if(!order) throw new BadGatewayException('Такой заявки не существует')
        return await this.prismaService.order.update({
            where: {id},
            data: {
                timeStart: dto?.timeStart,
                timeEnd: countingTimeEnd(dto.timeStart, dto.duration)
            }
        })
    }

    // --------------- Delete Order --------------- //
    async deleteOrder(id: number) {
        const order = await this.prismaService.order.findUnique({where: {id}})
        if(!order) return true
        return await this.prismaService.order.delete({where: {id}})
    }
}
