import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BankingService } from '../banking/banking.service';
import { CreatePaymentOrderDto } from './dto/create-payment-order.dto';
import { CreatePaymentOrderResponse } from './dto/create-payment-order-response.dto';
import { TransferLogService } from '../transfer-log/transfer-log.service';
import { ListPaymentOrderResponse } from './dto/list-payment-order-response.dto';

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
      Logger.error(error.message, 'payment-orders.service.ts - create');
      throw new InternalServerErrorException(error.message);
    }
  }

  async getOne(internalId: string): Promise<ListPaymentOrderResponse> {
    const params = { internalId };
    const transferData = await this.logService.get(params);

    if (!transferData) {
      Logger.error(params, 'Recurso não encontrado');
      throw new NotFoundException('Recurso não encontrado');
    }

    const response = new ListPaymentOrderResponse(transferData);

    return response;
  }
}
