import { TransferLogDocument } from '../../transfer-log/entity/transfer-log.entity';
import { PaymentOrderAttributes } from '../classes/payment-orders-attributes';
import { TransferStatus } from '../enum/transfer-status.enum';
import { Methods } from '../interfaces/methods.interface';

export class ListPaymentOrderResponse
  extends PaymentOrderAttributes
  implements Methods
{
  constructor(transfer: TransferLogDocument) {
    super();
    this.populate(transfer);
  }

  populate(transfer: TransferLogDocument): void {
    this.internalId = transfer.internalId;
    this.status = TransferStatus[transfer.status];
    this.externalId = transfer.externalId;
    this.amount = transfer.amount;
    this.expectedOn = transfer.expectedOn;
    this.dueDate = transfer.dueDate;
  }
}
