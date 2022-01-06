import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  Param,
  Get,
} from '@nestjs/common';
import { PaymentOrdersService } from './payment-orders.service';
import { CreatePaymentOrderDto } from './dto/create-payment-order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DueDatePipe } from './pipes/due-date.pipe';
import { CreatePaymentOrderResponse } from './dto/create-payment-order-response.dto';
import { ListPaymentOrderResponse } from './dto/list-payment-order-response.dto';
import { ListPaymentOrderRequest } from './dto/list-payment-order-request.dto';

@ApiTags('Payment Orders')
@Controller('paymentOrders')
export class PaymentOrdersController {
  constructor(private readonly paymentOrdersService: PaymentOrdersService) {}

  @ApiOperation({
    summary:
      'Rota responsável por validar/enviar request de liquidação de transferência',
    description:
      'Após validar a data e vencimento e o formato do valor da transferência, envia request de liquidação para API do banco',
  })
  @ApiResponse({
    status: 200,
    type: CreatePaymentOrderResponse,
    description: 'Transferência Criada no log e liquidada pelo banco',
  })
  @Post()
  @HttpCode(201)
  @UsePipes(new DueDatePipe())
  create(
    @Body() createPaymentOrderDto: CreatePaymentOrderDto,
  ): Promise<CreatePaymentOrderResponse> {
    return this.paymentOrdersService.create(createPaymentOrderDto);
  }

  @ApiOperation({
    summary:
      'Rota responsável por trazer do banco uma transferência a partir do internalID',
  })
  @ApiResponse({
    status: 200,
    type: ListPaymentOrderResponse,
    description: 'Transferência salva no log',
  })
  @Get('/:internalId')
  @HttpCode(200)
  get(
    @Param() param: ListPaymentOrderRequest,
  ): Promise<ListPaymentOrderResponse> {
    const { internalId } = param;
    return this.paymentOrdersService.getOne(internalId);
  }
}
