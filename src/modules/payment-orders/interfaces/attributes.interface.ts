import { TransferStatus } from '../enum/transfer-status.enum';

export interface Attributes {
  internalId: string;

  externalId: number;

  status: string;

  amount: number;

  expectedOn: string;

  dueDate?: string;
}
