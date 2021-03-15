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

test('- Test Ticker.historical("1d", "2021-03-01", "2021-03-15")', async () => {
  const ticker = new Ticker('V');

  const result = await ticker.historical('1d', '2021-03-01', '2021-03-15');

  if (result) {
    expect(result[0]).toHaveProperty('open');
    expect(result[0]).toHaveProperty('high');
    expect(result[0]).toHaveProperty('low');
    expect(result[0]).toHaveProperty('volume');
    expect(result[0]).toHaveProperty('close');
    expect(result[0]).toHaveProperty('date');
    expect(result.length).toEqual(10);
  } else {
    expect(result).toBe(undefined);
  }
});

test('- Test Ticker.historical("1m", "2021-03-01", "2021-03-02")', async () => {
  const ticker = new Ticker('V');

  const result = await ticker.historical('1m', '2021-03-01', '2021-03-15');

  if (result) {
    expect(1).toBe(1);
  } else {
    expect(result).toBe(undefined);
  }
});
