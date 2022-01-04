import { RegisterPaymentOrderResponseType } from '../../banking/types/register-payment-order-response.type';
import { PaymentOrderAttributes } from '../classes/payment-orders-attributes';
import { TransferStatus } from '../enum/transfer-status.enum';
import { Methods } from '../interfaces/methods.interface';
import { CreatePaymentOrderDto } from './create-payment-order.dto';

export class CreatePaymentOrderResponse
  extends PaymentOrderAttributes
  implements Methods
{
  constructor(
    banking: RegisterPaymentOrderResponseType,
    createPaymentOrderDto: CreatePaymentOrderDto,
  ) {
    super();
    this.populate(banking, createPaymentOrderDto);
  }

  populate(
    banking: RegisterPaymentOrderResponseType,
    createPaymentOrderDto: CreatePaymentOrderDto,
  ): void {
    this.internalId = banking.internalId;
    this.status = TransferStatus[banking.status];

    this.externalId = createPaymentOrderDto.externalId;
    this.amount = createPaymentOrderDto.amount;
    this.expectedOn = createPaymentOrderDto.expectedOn;
    this.dueDate = createPaymentOrderDto.dueDate;
  }
}
