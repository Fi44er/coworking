import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { EmailsModule } from '../mailer/mailer.module';

@Module({
  imports: [EmailsModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
