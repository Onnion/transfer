import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ListPaymentOrderRequest {
  @ApiProperty({
    description: 'Id interno da transferência',
    example: '31654014-5b20-4301-aaa6-90401b052a6b',
  })
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  internalId: string;
}
