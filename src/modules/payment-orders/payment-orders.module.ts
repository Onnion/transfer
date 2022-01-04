import { Module } from '@nestjs/common';
import { PaymentOrdersService } from './payment-orders.service';
import { PaymentOrdersController } from './payment-orders.controller';
import { BankingModule } from '../banking/banking.module';
import { TransferLogModule } from '../transfer-log/transfer-log.module';

@Module({
  controllers: [PaymentOrdersController],
  providers: [PaymentOrdersService],
  imports: [BankingModule, TransferLogModule],
})
export class PaymentOrdersModule {}
