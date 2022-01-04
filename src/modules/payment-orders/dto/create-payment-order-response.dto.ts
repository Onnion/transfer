import { RegisterPaymentOrderResponseType } from '../../banking/types/register-payment-order-response.type';
import { CreatePaymentOrderDto } from './create-payment-order.dto';

export class CreatePaymentOrderResponse {
  private internalId: string;

  private externalId: number;

  private status: 'CREATED' | 'APPROVED' | 'SCHEDULED' | 'REJECTED';

  private amount: number;

  private expectedOn: string;

  private dueDate: string;

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
