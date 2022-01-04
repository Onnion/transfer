import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransferLogDocument = TransferLog & Document;

@Schema({ collection: 'transfer-log' })
export class TransferLog {
  @Prop()
  status: string;

  @Prop()
  internalId: string;

  @Prop()
  externalId: number;

  @Prop()
  amount: number;

  @Prop()
  expectedOn: string;

  @Prop()
  dueDate: string;

  @Prop({
    default: Date.now,
  })
  timestamp: Date;

  constructor(props?: Record<string, any>) {
    Object.assign(this, props);
  }
}

export const TransferLogSchema = SchemaFactory.createForClass(TransferLog);
