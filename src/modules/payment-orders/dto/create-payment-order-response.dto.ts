import { RegisterPaymentOrderResponseType } from '../../banking/types/register-payment-order-response.type';
import { CreatePaymentOrderDto } from './create-payment-order.dto';

export class CreatePaymentOrderResponse {
  internalId: string;

  externalId: number;

  status: 'CREATED' | 'APPROVED' | 'SCHEDULED' | 'REJECTED';

  amount: number;

  expectedOn: string;

  dueDate: string;

  constructor(
    banking: RegisterPaymentOrderResponseType,
    createPaymentOrderDto: CreatePaymentOrderDto,
  ) {
    this.populate(banking, createPaymentOrderDto);
  }

  private populate(
    banking: RegisterPaymentOrderResponseType,
    createPaymentOrderDto: CreatePaymentOrderDto,
  ): void {
    this.internalId = banking.internalId;
    this.status = banking.status;

    this.externalId = createPaymentOrderDto.externalId;
    this.amount = createPaymentOrderDto.amount;
    this.expectedOn = createPaymentOrderDto.expectedOn;
    this.dueDate = createPaymentOrderDto.dueDate;
  }
}
