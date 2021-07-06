import axios, { AxiosResponse } from 'axios';

import {
  YAHOO_FINANCE_QUOTE_SUMMARY_URL,
  YAHOO_FINANCE_CHART_URL,
} from '../constants';

import {
  LiveQuoteData,
  ITicker,
  Interval,
  HistoricalData,
} from '../interfaces/ticker';

import {
  transformDateToTimestamp,
  transformTimestampToDate,
} from '../utils/time';

/**
 * Represents a stock in the market
 * @extends ITicker
 */
class Ticker implements ITicker {
  symbol: string;

  constructor(symbol: string) {
    this.symbol = symbol;
  }

  async liveQuote(): Promise<LiveQuoteData | undefined> {
    const URL = YAHOO_FINANCE_QUOTE_SUMMARY_URL(this.symbol, ['price']);

    try {
      const response: AxiosResponse<any> = await axios.get(URL);

      const liveQuoteResult = response.data.quoteSummary.result[0].price;

      return {
        open: Number(liveQuoteResult.regularMarketOpen.fmt),
        price: liveQuoteResult.regularMarketPrice.fmt,
        high: Number(liveQuoteResult.regularMarketDayHigh.fmt),
        low: Number(liveQuoteResult.regularMarketDayLow.fmt),
        volume: liveQuoteResult.regularMarketVolume.fmt,
        change: Number(liveQuoteResult.regularMarketChange.fmt),
        changePercent: liveQuoteResult.regularMarketChangePercent.fmt,
      };
    } catch (error) {
      return undefined;
    }
  }

  async historical(
    interval: Interval,
    start: string,
    end: string
  ): Promise<HistoricalData[] | undefined> {
    const URL = YAHOO_FINANCE_CHART_URL(
      this.symbol,
      interval,
      String(transformDateToTimestamp(start)),
      String(transformDateToTimestamp(end))
    );

    try {
      const response: AxiosResponse<any> = await axios.get(URL);

      const chartResult = response.data.chart.result[0];
      const timestamps = chartResult.timestamp;
      const quoteData = chartResult.indicators.quote[0];

      return timestamps.map((timestamp: number, index: number) => ({
        open: Number(quoteData.open[index]),
        high: Number(quoteData.high[index]),
        low: Number(quoteData.low[index]),
        volume: Number(quoteData.volume[index]),
        close: Number(quoteData.close[index]),
        date: String(transformTimestampToDate(timestamp)),
      }));
    } catch (error) {
      return undefined;
    }
  }
}

export default Ticker;
