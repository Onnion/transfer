import { Test, TestingModule } from '@nestjs/testing';
import { CreatePaymentOrderDto } from './dto/create-payment-order.dto';
import { PaymentOrdersController } from './payment-orders.controller';
import { PaymentOrdersService } from './payment-orders.service';

describe('PaymentOrdersController', () => {
  let controller: PaymentOrdersController;
  let service: PaymentOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentOrdersController],
      providers: [PaymentOrdersService],
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
});
