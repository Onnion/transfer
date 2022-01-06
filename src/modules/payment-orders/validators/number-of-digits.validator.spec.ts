import { validator } from './number-of-digits.validator';

describe('TurnIntoCoins', () => {
  it('should return true when number is valid', () => {
    const number = 10.99;
    const result = validator(number);
    expect(result).toBeTruthy();
  });

  it('should return false when number is invalid', () => {
    const number = 1.099;
    const result = validator(number);
    expect(result).toBeFalsy();
  });
});
