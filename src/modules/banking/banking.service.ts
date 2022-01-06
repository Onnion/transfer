import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
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
      Logger.log(error, 'banking.service.ts - register');
      throw new InternalServerErrorException(
        'Erro mo processo de integração com banking_api ',
      );
    }
  }
}
