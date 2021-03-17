/* eslint-disable no-undef */
import { HistoricalData } from '../interfaces/ticker';
import { Ticker, TechnicalAnalysisLibrary } from '../index';

// prettier-ignore
test('- Test TechnicalAnalysisLibrary.SMA() on daily Visa historical prices', async () => {
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

test('- Test TechnicalAnalysisLibrary.SMA() on undefined data', async () => {
  const ta = new TechnicalAnalysisLibrary();

  const result = ta.SMA(5, undefined);

  expect(result.toString()).toBe('Error: Data undefined.');
});

// prettier-ignore
test('- Test TechnicalAnalysisLibrary.SMA() on incomplete data', async () => {
  const ticker = new Ticker('V');

  const data: HistoricalData[] | undefined = await ticker.historical('1d', '2021-03-01', '2021-03-03');

  const ta = new TechnicalAnalysisLibrary();

  const result = ta.SMA(5, data);

  expect(result.toString()).toBe('Error: Not enough data to compute SMA for the target period.');
});

// prettier-ignore
test('- Test TechnicalAnalysisLibrary.EMA() on daily Visa historical prices', async () => {
  const ticker = new Ticker('V');

  const data: HistoricalData[] | undefined = await ticker.historical('1d', '2021-03-01', '2021-03-17');

  const ta = new TechnicalAnalysisLibrary();

  try {
    const result = ta.EMA(5, data);

    console.log(result);

    if (!(result instanceof Error)) {
      expect(result[result.length - 1]).toBe(223.44);
      expect(result[result.length - 2]).toBe(222.81);
      expect(result[result.length - 3]).toBe(222.58);
      expect(result[result.length - 4]).toBe(221.69);
      expect(result[result.length - 5]).toBe(219.47);
      expect(result[result.length - 6]).toBe(217.61);
      expect(result[result.length - 7]).toBe(216.24);
    }
  } catch (error) {
    console.log(error);
  }
});
