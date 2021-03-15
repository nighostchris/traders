/* eslint-disable no-unused-vars */
export type Interval =
  | '1m'
  | '2m'
  | '5m'
  | '15m'
  | '30m'
  | '60m'
  | '90m'
  | '1h'
  | '1d'
  | '5d'
  | '1wk'
  | '1mo'
  | '3mo';

export interface LiveQuoteData {
  open: string;
  price: string;
  high: string;
  low: string;
  volume: string;
  change: string;
  changePercent: string;
}

export interface HistoricalData {
  open: string;
  high: string;
  low: string;
  volume: string;
  close: string;
  date: string;
}

export interface ITicker {
  name: string;
  liveQuote(): Promise<LiveQuoteData | undefined>;
  historical(
    interval: Interval,
    start: string,
    end: string
  ): Promise<Array<HistoricalData> | undefined>;
}
