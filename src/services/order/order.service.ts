import { BadGatewayException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './DTO/createOrder.dto';
import { countingTimeEnd } from 'lib/utils/convert-to-time.util';

@Injectable()
export class OrderService {
    constructor(private readonly prismaService: PrismaService) {}

    // ------------------------------ Order ------------------------------ //

    // --------------- Create Order --------------- //
    async createOrder(dto: CreateOrderDto) {
        const timeEnd = countingTimeEnd(dto.timeStart, dto.duration)
        const order = await this.prismaService.order.create({
            data: {
                roomId: dto.roomId,
                date: new Date(dto.date),
                timeStart: dto.timeStart,
                timeEnd,
                summaryEvent: dto.summaryEvent,
                fio: dto.fio,
                email: dto.email,
                phoneNumber: dto.phoneNumber
            }
        })
        return order
    }



    private async checkFreeTime() {

    }


    // ------------------------------ Management Order ------------------------------ //

    // --------------- Update Order --------------- //
    async updateOrder(id: number, dto: CreateOrderDto) {
        const order = this.prismaService.order.findUnique({where: {id}})
        if(!order) throw new BadGatewayException('Такой заявки не существует')
        return await this.prismaService.order.update({
            where: {id},
            data: {
                date: dto?.date,
                timeStart: dto?.timeStart,
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
