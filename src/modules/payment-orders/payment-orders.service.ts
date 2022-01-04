import { Injectable } from '@nestjs/common';
import { BankingService } from '../banking/banking.service';
import { CreatePaymentOrderDto } from './dto/create-payment-order.dto';

@Injectable()
export class PaymentOrdersService {
  constructor(private readonly bankingService: BankingService) {}

  async create(createPaymentOrderDto: CreatePaymentOrderDto) {
    const responseBanking = await this.bankingService.register(
      createPaymentOrderDto,
    );
    console.log(responseBanking);
    return 'This action adds a new paymentOrder';
  }
}
