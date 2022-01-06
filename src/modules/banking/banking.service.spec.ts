import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { CreatePaymentOrderDto } from '../payment-orders/dto/create-payment-order.dto';
import { BankingService } from './banking.service';
import { RegisterPaymentOrderResponseType } from './types/register-payment-order-response.type';
import { AxiosResponse } from 'axios';
import {
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

describe('BankingService', () => {
  let service: BankingService;
  let httpService: HttpService;

  beforeEach(async () => {
    jest.spyOn(Logger, 'error').mockImplementation(() => {});

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [BankingService],
    }).compile();

    service = module.get<BankingService>(BankingService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should return object of type RegisterPaymentOrderResponseType when process excecute successfully', async () => {
      const data: CreatePaymentOrderDto = {
        amount: 100,
        expectedOn: '2025-12-12',
        externalId: 1,
        dueDate: '2025-12-12',
      };
      const bankingResponse: RegisterPaymentOrderResponseType = {
        internalId: '31654014-5b20-4301-aaa6-90401b052a6b',
        status: 'CREATED',
      };

      const response: AxiosResponse<RegisterPaymentOrderResponseType> = {
        data: bankingResponse,
        headers: {},
        config: { url: 'http://localhost:3000' },
        status: 200,
        statusText: 'OK',
      };
      jest
        .spyOn(httpService, 'post')
        .mockImplementationOnce(() => of(response));

      const result = await service.register(data);
      expect(result).toMatchObject(bankingResponse);
    });

    it('should return InternalServerErrorException error when process excecute with error', async () => {
      try {
        const error: any = new Error('');
        const data: CreatePaymentOrderDto = {
          amount: 100,
          expectedOn: '2025-12-12',
          externalId: 1,
          dueDate: '2025-12-12',
        };

        jest.spyOn(httpService, 'post').mockReturnValueOnce(error);
        await service.register(data);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });
});
