/* eslint-disable no-undef */
import { Ticker } from '../index';
import { LiveQuoteData } from '../interfaces/ticker';

test('- Test Ticker.liveQuote()', async () => {
  const demoObject: LiveQuoteData = {
    open: '',
    price: '',
    high: '',
    low: '',
    volume: '',
    change: '',
    changePercent: '',
  };

  const ticker = new Ticker('V');

  const result = await ticker.liveQuote();

  expect(result).toMatchObject(demoObject);
});
