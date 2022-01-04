import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentOrderDto {
  @ApiProperty({
    description: 'Id externo da transferência'
  })
  @IsNumber()
  @IsNotEmpty()
  externalId: number; 

  @ApiProperty({
    description: 'Quantidade em centavos da transferência (100 -> R$ 1,00)',
    example: '100'
  })
  @IsNumber()
  @IsNotEmpty()
  amount:  number;

  @ApiProperty({
    description: 'Data da liquidação da transferência',
    example: '2021-12-25',
    format: 'yyyy-MM-DD'
  })
  @IsDateString()
  @IsString()
  @IsNotEmpty()
  expectedOn: string;

  @ApiProperty({
    description: 'Data de vencimento da transferência',
    example: '2021-12-25',
    format: 'yyyy-MM-DD',
    required: false,
  })
  @IsDateString()
  @IsString()
  @IsOptional()
  dueDate?: string;
}
