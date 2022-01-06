import { TurnIntoCoins } from './turn-into-coins.transform';

describe('TurnIntoCoins', () => {
  it('should return the same value when value is not float currency', () => {
    const expectedResult = 1099;
    const params: any = {
      value: 1099,
    };

    const result = TurnIntoCoins(params);
    expect(result).toBe(expectedResult);
  });

  it('should return value * 100 when value is float currency', () => {
    const expectedResult = 1099;
    const params: any = {
      value: 10.99,
    };

    const result = TurnIntoCoins(params);
    expect(result).toBe(expectedResult);
  });
});
