import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreatePaymentOrderDto } from '../dto/create-payment-order.dto';

@Injectable()
export class DueDatePipe implements PipeTransform<CreatePaymentOrderDto> {
  private isDueDateValid(dueDateParam: string): boolean {
    const now = new Date();
    const dueDate = new Date(dueDateParam);

    return dueDate >= now;
  }

  async transform(value: CreatePaymentOrderDto): Promise<CreatePaymentOrderDto> {
    const { dueDate: dueDateParam } = value;

    if (!!dueDateParam) {
      const isValid = this.isDueDateValid(dueDateParam);

      if (!isValid) {
        throw new HttpException(
          'Erro de Negócio',
          HttpStatus.METHOD_NOT_ALLOWED,
        );
      }
    }

    return value;
  }
}
