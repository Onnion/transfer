import { TransferStatus } from '../enum/transfer-status.enum';
import { Attributes } from '../interfaces/attributes.interface';

export abstract class PaymentOrderAttributes implements Attributes {
  internalId: string;

  externalId: number;

  status: TransferStatus;

  amount: number;

  expectedOn: string;

  dueDate: string;
}
