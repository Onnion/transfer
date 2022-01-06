import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TransferStatus } from '../enum/transfer-status.enum';
import { Attributes } from '../interfaces/attributes.interface';
import { TurnIntoCoins } from '../transforms/turn-into-coins/turn-into-coins.transform';
import { IsValidCurrency } from '../validators/number-of-digits.validator';

export abstract class PaymentOrderAttributes implements Attributes {
  @ApiProperty({
    description: 'Id interno da transferência',
    example: '31654014-5b20-4301-aaa6-90401b052a6b',
  })
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  internalId: string;

  @ApiProperty({
    description: 'Id externo da transferência',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  externalId: number;

  status: TransferStatus;

  @ApiProperty({
    description: 'Quantidade em centavos da transferência (100 -> R$ 1,00)',
    example: 100,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsValidCurrency({ message: 'Número de casas decimais inválidas' })
  @Transform(TurnIntoCoins)
  amount: number;

  @ApiProperty({
    description: 'Data da liquidação da transferência',
    example: '2021-12-25',
    format: 'yyyy-MM-DD',
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
