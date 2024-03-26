import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './DTO/CreateOrder.dto';
import { Public } from 'lib/decorators/public.decorator';
import { OrderResponse } from './Response/Order.response';
import { UpdateOrderDto } from './DTO/UpdateOrder.dto';
import { ApiTags, ApiBody, ApiParam, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { EmailService } from '../mailer/mailer.service';

@Public()
@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // --------------- Add Order --------------- //
  @Post('create-order')
  @ApiOperation({ summary: 'Create order' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: 'Order created', type: OrderResponse })
  async createOrder(@Body() dto: CreateOrderDto): Promise<OrderResponse> {
    return this.orderService.createOrder(dto);
  }


  // ------------------------------ Management Order ------------------------------ //

  //  --------------- Delete Order --------------- //
  @Delete('delete-order/:id')
  @ApiOperation({ summary: 'Delete order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order deleted', type: Boolean })
  async deleteOrder(@Param('id') id: string): Promise<boolean> {
    return this.orderService.deleteOrder(+id);
  }

  // --------------- Update Order --------------- //
  @Put('update-order/:id')
  @ApiOperation({ summary: 'Update order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiBody({ type: UpdateOrderDto })
  @ApiResponse({ status: 200, description: 'Order updated', type: OrderResponse })
  async updateOrder(@Param('id') id: string, @Body() dto: UpdateOrderDto): Promise<OrderResponse> {
    return this.orderService.updateOrder(+id, dto);
  }

  // --------------- Update Order satus --------------- //
  @Put('update-order-status/:id')
  async updateOrderStatus(@Param('id') id: string, @Body() status: OrderStatus): Promise<OrderStatus> {
    return this.orderService.updateOrderStatus(+id, status)
  }
}