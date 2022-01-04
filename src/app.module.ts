import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PaymentOrdersModule } from './modules/payment-orders/payment-orders.module';
import { TransferLogModule } from './modules/transfer-log/transfer-log.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [AppController],
  imports: [
    PaymentOrdersModule,
    TransferLogModule,
    MongooseModule.forRoot(process.env.MONGO_URI, {
      connectionName: process.env.MONGO_DOCKER_SERVICE,
    }),
  ],
})
export class AppModule {}
