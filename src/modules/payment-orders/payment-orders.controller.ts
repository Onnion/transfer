import { Controller, Post, Body, HttpCode, UsePipes } from '@nestjs/common';
import { PaymentOrdersService } from './payment-orders.service';
import { CreatePaymentOrderDto } from './dto/create-payment-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { DueDatePipe } from './pipes/due-date.pipe';

@ApiTags('Payment Orders')
@Controller('paymentOrders')
export class PaymentOrdersController {
  constructor(private readonly paymentOrdersService: PaymentOrdersService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new DueDatePipe())
  create(@Body() createPaymentOrderDto: CreatePaymentOrderDto) {
    return this.paymentOrdersService.create(createPaymentOrderDto);
  }
}
