import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePaymentOrderResponse } from '../payment-orders/dto/create-payment-order-response.dto';
import { TransferLog, TransferLogDocument } from './entity/transfer-log.entity';

@Injectable()
export class TransferLogService {
  constructor(
    @InjectModel(TransferLog.name)
    private logModel: Model<TransferLogDocument>,
  ) {}

  async commit(data: CreatePaymentOrderResponse): Promise<void> {
    this.logModel.create(data);
  }
}
