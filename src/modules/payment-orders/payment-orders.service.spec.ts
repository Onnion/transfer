import { HttpModule } from '@nestjs/axios';
import { InternalServerErrorException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { BankingService } from '../banking/banking.service';
import { RegisterPaymentOrderResponseType } from '../banking/types/register-payment-order-response.type';
import { repositoryMockFactory } from '../core/helpers/repository-factory.mock';
import { TransferLog } from '../transfer-log/entity/transfer-log.entity';
import { TransferLogService } from '../transfer-log/transfer-log.service';
import { CreatePaymentOrderDto } from './dto/create-payment-order.dto';
import { PaymentOrdersService } from './payment-orders.service';

describe('PaymentOrdersService', () => {
  let service: PaymentOrdersService;
  let logService: TransferLogService;
  let bankingService: BankingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        PaymentOrdersService,
        BankingService,
        TransferLogService,
        {
          provide: getModelToken(TransferLog.name),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<PaymentOrdersService>(PaymentOrdersService);
    logService = module.get<TransferLogService>(TransferLogService);
    bankingService = module.get<BankingService>(BankingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return error when process excecute with errors', async () => {
      try {
        const error = new Error();
        const data: CreatePaymentOrderDto = {
          amount: 100,
          expectedOn: '2025-12-12',
          externalId: 1,
          dueDate: '2025-12-12',
        };

        jest
          .spyOn(bankingService, 'register')
          .mockImplementationOnce(() => Promise.reject(error));

        await service.create(data);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });

    it('should call logService, bankingService and return value with all data', async () => {
      const logServiceSpy = jest.spyOn(logService, 'commit');
      const bankingResponse: RegisterPaymentOrderResponseType = {
        internalId: '31654014-5b20-4301-aaa6-90401b052a6b',
        status: 'CREATED',
      };
      const bankingServiceSpy = jest
        .spyOn(bankingService, 'register')
        .mockResolvedValueOnce(bankingResponse);

      const data: CreatePaymentOrderDto = {
        amount: 100,
        expectedOn: '2025-12-12',
        externalId: 1,
        dueDate: '2025-12-12',
      };

      const result = await service.create(data);

      expect(bankingServiceSpy).toHaveBeenCalledTimes(1);
      expect(bankingServiceSpy).toHaveBeenCalledWith(data);

      expect(logServiceSpy).toHaveBeenCalledTimes(1);
      expect(logServiceSpy).toHaveBeenCalledWith(result);

      expect(result).toMatchObject({ ...data, ...bankingResponse });
    });
  });
});
