import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PaymentOrdersModule } from './modules/payment-orders/payment-orders.module';

@Module({
  imports: [PaymentOrdersModule],
  controllers: [AppController],
})
export class AppModule {}
