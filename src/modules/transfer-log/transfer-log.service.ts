import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
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
    try {
      await this.logModel.create(data);
    } catch (error) {
      Logger.error(error.message, 'transfer-log.service.ts - commit');
      throw new InternalServerErrorException(error.message);
    }
  }

  async get(params = {}): Promise<TransferLogDocument> {
    try {
      const transfer = await this.logModel.findOne(params);
      return transfer;
    } catch (error) {
      Logger.error(error.message, 'transfer-log.service.ts - get');
      throw new InternalServerErrorException(error.message);
    }
  }
}
