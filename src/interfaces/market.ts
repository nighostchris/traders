export interface ConstitueRecord {
  symbol: string;
  name: string;
}

export interface IMarket {
  listNasdaq(): Promise<Array<ConstitueRecord> | undefined>;

  listSNP(): Promise<Array<ConstitueRecord> | undefined>;
}
