// eslint-disable-next-line import/named
import { TransformFnParams } from 'class-transformer';
import { IS_FLOAT_CURRENCY } from '../../../core/regex/amount.regex';

export const TurnIntoCoins = (params: TransformFnParams): number => {
  let amount = params.value;
  const amountStr = `${amount}`;

  if (IS_FLOAT_CURRENCY.test(`${amountStr}`)) {
    amount = amount * 100;
  }

  return amount;
};
