import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CreatePaymentOrderDto } from '../dto/create-payment-order.dto';
import { TransferStatus } from '../enum/transfer-status.enum';
import { Attributes } from '../interfaces/attributes.interface';

export abstract class PaymentOrderAttributes
  extends CreatePaymentOrderDto
  implements Attributes
{
  @ApiProperty({
    description: 'Id interno da transferência',
    example: '31654014-5b20-4301-aaa6-90401b052a6b',
  })
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  internalId: string;

  @ApiProperty({
    description: 'Status da liquidação de transferência',
    enum: TransferStatus,
  })
  @IsNotEmpty()
  @IsEnum(TransferStatus)
  status: TransferStatus;
}
