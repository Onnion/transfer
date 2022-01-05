import { registerDecorator, ValidationOptions } from 'class-validator';
import { INVALID_DIGITS } from '../../core/regex/amount.regex';

export function IsValidCurrency(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: number) {
          return !INVALID_DIGITS.test(`${value}`);
        },
      },
    });
  };
}
