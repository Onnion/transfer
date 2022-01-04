import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BankingService } from './banking.service';

@Module({
  imports: [HttpModule],
  providers: [BankingService],
  exports: [BankingService],
})
export class BankingModule {}
