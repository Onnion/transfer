import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransferLog, TransferLogSchema } from './entity/transfer-log.entity';
import { TransferLogService } from './transfer-log.service';

@Module({
  providers: [TransferLogService],
  exports: [TransferLogService],
  imports: [
    MongooseModule.forFeature(
      [{ name: TransferLog.name, schema: TransferLogSchema }],
      process.env.MONGO_DOCKER_SERVICE,
    ),
  ],
})
export class TransferLogModule {}
