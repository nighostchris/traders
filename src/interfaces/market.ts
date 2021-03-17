export interface NasdaqRecord {
  symbol: string;
  name: string;
}

export interface IMarket {
  listNasdaq(): Promise<Array<NasdaqRecord> | undefined>;
}
