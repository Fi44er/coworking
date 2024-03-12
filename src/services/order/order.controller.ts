import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './DTO/createOrder.dto';
import { Public } from 'lib/decorators/public.decorator';

@Public()
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post('create-order')
    async createOrder(@Body() dto: CreateOrderDto) {
        return this.orderService.createOrder(dto)
    }
}
