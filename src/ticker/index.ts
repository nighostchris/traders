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

class Ticker implements ITicker {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  async liveQuote(): Promise<LiveQuoteData | undefined> {
    const URL = YAHOO_FINANCE_QUOTE_SUMMARY_URL(this.name, ['price']);

    try {
      const response: AxiosResponse<any> = await axios.get(URL);

      const liveQuoteResult = response.data.quoteSummary.result[0].price;

      return {
        open: liveQuoteResult.regularMarketOpen.fmt,
        price: liveQuoteResult.regularMarketPrice.fmt,
        high: liveQuoteResult.regularMarketDayHigh.fmt,
        low: liveQuoteResult.regularMarketDayLow.fmt,
        volume: liveQuoteResult.regularMarketVolume.fmt,
        change: liveQuoteResult.regularMarketChange.fmt,
        changePercent: liveQuoteResult.regularMarketChangePercent.fmt,
      };
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async historical(
    interval: Interval,
    start: string,
    end: string
  ): Promise<Array<HistoricalData> | undefined> {
    const URL = YAHOO_FINANCE_CHART_URL(
      this.name,
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
        open: quoteData.open[index],
        high: quoteData.high[index],
        low: quoteData.low[index],
        volume: quoteData.volume[index],
        close: quoteData.close[index],
        date: String(transformTimestampToDate(timestamp)),
      }));
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}

export default Ticker;
