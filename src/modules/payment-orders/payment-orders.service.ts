import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BankingService } from '../banking/banking.service';
import { CreatePaymentOrderDto } from './dto/create-payment-order.dto';
import { CreatePaymentOrderResponse } from './dto/create-payment-order-response.dto';
import { TransferLogService } from '../transfer-log/transfer-log.service';

@Injectable()
export class PaymentOrdersService {
  constructor(
    private readonly bankingService: BankingService,
    private readonly logService: TransferLogService,
  ) {}

  async create(
    createPaymentOrderDto: CreatePaymentOrderDto,
  ): Promise<CreatePaymentOrderResponse> {
    try {
      const responseBanking = await this.bankingService.register(
        createPaymentOrderDto,
      );

      const response = new CreatePaymentOrderResponse(
        responseBanking,
        createPaymentOrderDto,
      );

      await this.logService.commit(response);

      return response;
    } catch (error) {
      // @TODO log
      throw new InternalServerErrorException(
        'Error interno no serviço de transferência',
      );
    }
  }
}
