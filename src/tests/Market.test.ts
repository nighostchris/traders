/* eslint-disable no-undef */
import { Market } from '../index';

test('- Test Market.listNasdaq()', async () => {
  const market = new Market();

  const result = await market.listNasdaq();

  if (result) {
    expect(result[0]).toHaveProperty('symbol');
    expect(result[0]).toHaveProperty('name');
  } else {
    expect(result).toBe(undefined);
  }
});

test('- Test Market.listSNP()', async () => {
  const market = new Market();

  const result = await market.listSNP();

  if (result) {
    expect(result[0]).toHaveProperty('symbol');
    expect(result[0]).toHaveProperty('name');
  } else {
    expect(result).toBe(undefined);
  }
});
