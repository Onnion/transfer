import { Module } from '@nestjs/common';
import { PaymentOrdersService } from './payment-orders.service';
import { PaymentOrdersController } from './payment-orders.controller';

@Module({
  controllers: [PaymentOrdersController],
  providers: [PaymentOrdersService],
})
export class PaymentOrdersModule {}
