import {
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import {
  MockType,
  repositoryMockFactory,
} from '../core/helpers/repository-factory.mock';
import { CreatePaymentOrderResponse } from '../payment-orders/dto/create-payment-order-response.dto';
import { TransferStatus } from '../payment-orders/enum/transfer-status.enum';
import { TransferLog, TransferLogDocument } from './entity/transfer-log.entity';
import { TransferLogService } from './transfer-log.service';

describe('TransferLogService', () => {
  let service: TransferLogService;
  let transferMock: MockType<Model<TransferLog>>;

  beforeEach(async () => {
    jest.spyOn(Logger, 'error').mockImplementation(() => {});

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransferLogService,
        {
          provide: getModelToken(TransferLog.name),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<TransferLogService>(TransferLogService);
    transferMock = module.get(getModelToken(TransferLog.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('commit', () => {
    it('should return InternalServerErrorException when writing process returns error', async () => {
      try {
        const exception = new Error('');
        const createPaymentOrderBody: any = {
          amount: 1000,
          dueDate: '2025-01-01',
          expectedOn: '2025-01-01',
          externalId: 1,
          status: TransferStatus.CREATED,
          internalId: '31654014-5b20-4301-aaa6-90401b052a6b',
        } as CreatePaymentOrderResponse;
        jest
          .spyOn(transferMock, 'create')
          .mockImplementationOnce(() => Promise.reject(exception));

        await service.commit(createPaymentOrderBody);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });

  describe('get', () => {
    it('should return null if internalId not registered', async () => {
      transferMock.findOne.mockReturnValueOnce(null);
      const response = await service.get(
        '31654014-5b20-4301-aaa6-90401b052a6b',
      );
      expect(response).toBeNull();
    });

    it('should return the transfer', async () => {
      const transfer: TransferLog = {
        status: TransferStatus.SCHEDULED,
        internalId: '31654014-5b20-4301-aaa6-90401b052a6b',
        amount: 100,
        dueDate: '2025-12-01',
        expectedOn: '2025-12-01',
        timestamp: new Date(),
      } as TransferLogDocument;
      transferMock.findOne.mockReturnValueOnce(transfer);
      const response = await service.get(
        '31654014-5b20-4301-aaa6-90401b052a6b',
      );
      expect(response).toMatchObject(transfer);
    });

    it('should call findOne method with default param value', async () => {
      const defaultParam = {};
      const modelSpy = jest.spyOn(transferMock, 'findOne');

      await service.get();

      expect(modelSpy).toBeCalledTimes(1);
      expect(modelSpy).toHaveBeenCalledWith(defaultParam);
    });

    it('should return InternalServerErrorException when writing process returns error', async () => {
      try {
        const exception = new Error('');
        jest
          .spyOn(transferMock, 'findOne')
          .mockImplementationOnce(() => Promise.reject(exception));

        await service.get();
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });
});
