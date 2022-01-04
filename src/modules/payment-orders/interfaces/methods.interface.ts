import { RegisterPaymentOrderResponseType } from '../../banking/types/register-payment-order-response.type';
import { TransferLogDocument } from '../../transfer-log/entity/transfer-log.entity';
import { CreatePaymentOrderDto } from '../dto/create-payment-order.dto';

export interface Methods {
  populate(
    transfer: RegisterPaymentOrderResponseType | TransferLogDocument,
    createPaymentOrderDto?: CreatePaymentOrderDto,
  ): void;
}
