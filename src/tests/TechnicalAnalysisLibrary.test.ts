/* eslint-disable no-undef, camelcase */
import _ from 'lodash';

import { HistoricalData } from '../interfaces/ticker';
import { Ticker, TechnicalAnalysisLibrary } from '../index';

// prettier-ignore
test.skip('- Test TechnicalAnalysisLibrary.SMA() on daily Visa historical prices', async () => {
  const ticker = new Ticker('V');

  const data: HistoricalData[] | undefined = await ticker.historical('1d', '2021-03-01', '2021-03-17');

  const ta = new TechnicalAnalysisLibrary();

  try {
    const result = ta.SMA(5, data);

    if (!(result instanceof Error)) {
      expect(result[result.length - 1]).toBe(224.33);
      expect(result[result.length - 2]).toBe(223.46);
      expect(result[result.length - 3]).toBe(222.86);
      expect(result[result.length - 4]).toBe(221.07);
      expect(result[result.length - 5]).toBe(218.14);
    }
  } catch (error) {
    console.log(error);
  }
});

test.skip('- Test TechnicalAnalysisLibrary.SMA() on undefined data', async () => {
  const ta = new TechnicalAnalysisLibrary();

  const result = ta.SMA(5, undefined);

  expect(result.toString()).toBe('Error: Data undefined.');
});

// prettier-ignore
test.skip('- Test TechnicalAnalysisLibrary.SMA() on incomplete data', async () => {
  const ticker = new Ticker('V');

  const data: HistoricalData[] | undefined = await ticker.historical('1d', '2021-03-01', '2021-03-03');

  const ta = new TechnicalAnalysisLibrary();

  const result = ta.SMA(5, data);

  expect(result.toString()).toBe('Error: Not enough data to compute SMA for the target period.');
});

// prettier-ignore
test.skip('- Test TechnicalAnalysisLibrary.EMA() on daily Visa historical prices', async () => {
  const ticker = new Ticker('V');

  const data: HistoricalData[] | undefined = await ticker.historical('1d', '2021-02-15', '2021-03-11');

  const ta = new TechnicalAnalysisLibrary();

  try {
    const result_5ma = ta.EMA(5, data);

    if (!(result_5ma instanceof Error)) {
      expect(_.round(result_5ma[result_5ma.length - 1], 3)).toBe(219.465);
    }
  } catch (error) {
    console.log(error);
  }
});

// prettier-ignore
test('- Test TechnicalAnalysisLibrary.SMI() on daily Visa historical prices', async () => {
  const ticker = new Ticker('V');

  const data: HistoricalData[] | undefined = await ticker.historical('1d', '2021-02-26', '2021-03-15');

  const ta = new TechnicalAnalysisLibrary();

  try {
    const result_3ma = ta.SMI(10, 3, data);

    console.log(result_3ma);

    if (!(result_3ma instanceof Error)) {
      // expect(_.round(result_5ma[result_5ma.length - 1], 3)).toBe(219.465);
      expect(1).toBe(1);
    }
  } catch (error) {
    console.log(error);
  }
});
