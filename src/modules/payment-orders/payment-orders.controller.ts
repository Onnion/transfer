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
import { ApiTags } from '@nestjs/swagger';
import { DueDatePipe } from './pipes/due-date.pipe';
import { CreatePaymentOrderResponse } from './dto/create-payment-order-response.dto';
import { ListPaymentOrderResponse } from './dto/list-payment-order-response.dto';

@ApiTags('Payment Orders')
@Controller('paymentOrders')
export class PaymentOrdersController {
  constructor(private readonly paymentOrdersService: PaymentOrdersService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new DueDatePipe())
  create(
    @Body() createPaymentOrderDto: CreatePaymentOrderDto,
  ): Promise<CreatePaymentOrderResponse> {
    return this.paymentOrdersService.create(createPaymentOrderDto);
  }

  @Get('/:internalId')
  @HttpCode(200)
  get(@Param() param: any): Promise<ListPaymentOrderResponse> {
    const { internalId } = param;
    return this.paymentOrdersService.getOne(internalId);
  }
}
