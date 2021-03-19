/* eslint-disable no-unused-vars */

// prettier-ignore
/**
 * Valid timeframes for retrieving historical price between 2 dates
 */
export type Interval = '1m' | '2m' | '5m' | '15m' | '30m' | '60m' | '90m' | '1h' | '1d' | '5d' | '1wk' | '1mo' | '3mo';

/**
 * Structure of response object by liveQuote()
 */
export interface LiveQuoteData {
  open: number;
  price: number;
  high: number;
  low: number;
  volume: number;
  change: number;
  changePercent: string;
}

/**
 * Structure of response object by historical()
 */
export interface HistoricalData {
  open: number;
  high: number;
  low: number;
  volume: number;
  close: number;
  date: string;
}

/**
 * Interface for Ticker class
 */
export interface ITicker {
  symbol: string;

  /**
   * Get the real-time market price related information on that stock
   * @returns {Promise<LiveQuoteData | undefined>} The real time price data
   */
  liveQuote(): Promise<LiveQuoteData | undefined>;

  /**
   * Get the historical prices for particular stock
   * @param interval Valid timeframes for the data
   * @param start Start date for the data in format [YYYY-MM-DD]
   * @param end End date for the data in format [YYYY-MM-DD]
   * @returns {Promise<HistoricalData[] | undefined>} The historical price data
   */
  // prettier-ignore
  historical(interval: Interval, start: string, end: string)
    : Promise<HistoricalData[] | undefined>;
}
