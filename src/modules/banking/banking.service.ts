import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreatePaymentOrderDto } from '../payment-orders/dto/create-payment-order.dto';
import { RegisterPaymentOrderResponseType } from './types/register-payment-order-response.type';

@Injectable()
export class BankingService {
  private readonly path = 'payment-orders';

  constructor(private readonly httpService: HttpService) {}

  async register(
    createPaymentOrderDto?: CreatePaymentOrderDto,
  ): Promise<RegisterPaymentOrderResponseType> {
    try {
      const url = `${process.env.BANKING_URL}/${this.path}`;
      const observableResponse =
        this.httpService.post<RegisterPaymentOrderResponseType>(url);
      const response = await firstValueFrom(observableResponse);

      return response.data;
    } catch (error) {
      // @TODO LOG
      throw new InternalServerErrorException(
        'Error interno no serviço de transferência',
      );
    }
  }
}
