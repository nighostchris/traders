/* eslint-disable no-undef */
import { Ticker } from '../index';

test('- Test Ticker.liveQuote()', async () => {
  const ticker = new Ticker('V');

  const result = await ticker.liveQuote();

  if (result) {
    expect(result).toHaveProperty('open');
    expect(result).toHaveProperty('price');
    expect(result).toHaveProperty('high');
    expect(result).toHaveProperty('low');
    expect(result).toHaveProperty('volume');
    expect(result).toHaveProperty('change');
    expect(result).toHaveProperty('changePercent');
  } else {
    expect(result).toBe(undefined);
  }
});
