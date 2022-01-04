import { PipeTransform, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePaymentOrderDto } from '../dto/create-payment-order.dto';

@Injectable()
export class DueDatePipe implements PipeTransform<CreatePaymentOrderDto> {
  async transform(value: CreatePaymentOrderDto): Promise<boolean> {
    const { dueDate: dueDateParam } = value;

    if (!!dueDateParam) {
      const now = new Date();
      const dueDate = new Date(dueDateParam);
      const isValid = dueDate >= now;
  
      if (!isValid) {
        throw new HttpException('Erro de Negócio', HttpStatus.METHOD_NOT_ALLOWED);
      }
  
    }

    return !!value;
  }
}