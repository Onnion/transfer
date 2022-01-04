import { Module } from '@nestjs/common';
import { PaymentOrdersService } from './payment-orders.service';
import { PaymentOrdersController } from './payment-orders.controller';
import { BankingModule } from '../banking/banking.module';

@Module({
  controllers: [PaymentOrdersController],
  providers: [PaymentOrdersService],
  imports: [BankingModule],
})
export class PaymentOrdersModule {}
