import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PaymentOrdersModule } from './modules/payment-orders/payment-orders.module';
import { TransferLogModule } from './modules/transfer-log/transfer-log.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '@algoan/nestjs-logging-interceptor';

@Module({
  controllers: [AppController],
  imports: [
    PaymentOrdersModule,
    TransferLogModule,
    MongooseModule.forRoot(process.env.MONGO_URI, {
      connectionName: process.env.MONGO_DOCKER_SERVICE,
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
