import { HttpModule } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { BankingService } from '../banking/banking.service';
import { repositoryMockFactory } from '../core/helpers/repository-factory.mock';
import {
  TransferLog,
  TransferLogDocument,
} from '../transfer-log/entity/transfer-log.entity';
import { TransferLogService } from '../transfer-log/transfer-log.service';
import { CreatePaymentOrderDto } from './dto/create-payment-order.dto';
import { ListPaymentOrderResponse } from './dto/list-payment-order-response.dto';
import { TransferStatus } from './enum/transfer-status.enum';
import { PaymentOrdersController } from './payment-orders.controller';
import { PaymentOrdersService } from './payment-orders.service';

describe('PaymentOrdersController', () => {
  let controller: PaymentOrdersController;
  let service: PaymentOrdersService;

  beforeEach(async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentOrdersController],
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

    controller = module.get<PaymentOrdersController>(PaymentOrdersController);
    service = module.get<PaymentOrdersService>(PaymentOrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it("should call service's create method", async () => {
      const spy = jest.spyOn(service, 'create');
      const createPaymentOrderBody: CreatePaymentOrderDto = {
        amount: 100,
        expectedOn: '2025-12-12',
        externalId: 1,
        dueDate: '2025-12-12',
      };

      controller.create(createPaymentOrderBody);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(createPaymentOrderBody);
    });
  });

  describe('get', () => {
    it("should call service's create method", async () => {
      const spy = jest.spyOn(service, 'getOne');
      controller.get({ internalId: '31654014-5b20-4301-aaa6-90401b052a6b' });

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('31654014-5b20-4301-aaa6-90401b052a6b');
    });
  });
});
