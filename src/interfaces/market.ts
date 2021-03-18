/**
 * General structure of response object by Market functions
 */
export interface ConstituentRecord {
  symbol: string;
  name: string;
}

/**
 * Interface for Market class
 */
export interface IMarket {
  /**
   * Get the symbol and name of NASDAQ constituents
   */
  listNasdaq(): Promise<ConstituentRecord[] | undefined>;

  /**
   * Get the symbol and name of S&P 500 constituents
   */
  listSNP(): Promise<ConstituentRecord[] | undefined>;
}
