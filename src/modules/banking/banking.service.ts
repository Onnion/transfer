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
    createPaymentOrderDto: CreatePaymentOrderDto,
  ): Promise<RegisterPaymentOrderResponseType> {
    try {
      const url = `${process.env.TZ}/${this.path}`;
      const response = await firstValueFrom(
        this.httpService.post<RegisterPaymentOrderResponseType>(
          url,
          createPaymentOrderDto,
        ),
      );

      return response.data;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error interno no serviço de transferência',
      );
    }
  }
}
