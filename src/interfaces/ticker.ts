export interface LiveQuoteData {
  open: string;
  price: string;
  high: string;
  low: string;
  volume: string;
  change: string;
  changePercent: string;
}

export interface ITicker {
  name: string;
  liveQuote(): Promise<LiveQuoteData | undefined>;
}
