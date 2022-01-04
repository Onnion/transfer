import { Injectable } from '@nestjs/common';
import { CreatePaymentOrderDto } from './dto/create-payment-order.dto';

@Injectable()
export class PaymentOrdersService {
  create(createPaymentOrderDto: CreatePaymentOrderDto) {
    return 'This action adds a new paymentOrder';
  }
}
