import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePaymentOrderDto } from '../dto/create-payment-order.dto';
import { DueDatePipe } from './due-date.pipe';

describe('DueDatePipe', () => {
  let pipe: DueDatePipe;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [DueDatePipe],
    }).compile();

    pipe = app.get<DueDatePipe>(DueDatePipe);
  });

  it('should be defined', () => {
    expect(new DueDatePipe()).toBeDefined();
  });

  it('should return 405 status code when dueDate is less than today', async () => {
    try {
      const valueToValidate: CreatePaymentOrderDto = {
        amount: 100,
        expectedOn: '2025-12-12',
        externalId: 1,
        dueDate: '2020-12-12',
      };

      await pipe.transform(valueToValidate);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(405);
    }
  });

  it('should be true when dueDate is equal or greater than today', async () => {
    const valueToValidate: CreatePaymentOrderDto = {
      amount: 100,
      expectedOn: '2025-12-12',
      externalId: 1,
      dueDate: '2025-12-12',
    };

    const response = await pipe.transform(valueToValidate);

    expect(response).toMatchObject(valueToValidate);
  });

  it('should be true when dueDate is not defined', async () => {
    const valueToValidate: CreatePaymentOrderDto = {
      amount: 100,
      expectedOn: '2025-12-12',
      externalId: 1,
    };

    const response = await pipe.transform(valueToValidate);

    expect(response).toMatchObject(valueToValidate);
  });
});
