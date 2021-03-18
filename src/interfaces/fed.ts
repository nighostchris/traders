/* eslint-disable no-unused-vars */

export interface BalanceSheetXMLObservation {
  index: string;
  value: string;
}

export interface BalanceSheetXMLChart {
  title: string;
  series: {
    name: string;
    description: string;
    frequency: string;
    observation: BalanceSheetXMLObservation[];
  };
}

export interface BalanceSheetXML {
  page: {
    title: string;
    caption: string[];
    chart: BalanceSheetXMLChart[];
  };
}

/**
 * General structure of response object by FEDBalanceSheet functions
 */
export interface BalanceSheetRecord {
  date: string;
  value: number;
}

// prettier-ignore
/**
 * Interface for FEDBalanceSheet class
 */
export interface IFEDBalanceSheet {
  /**
   * Get the total assets of Federal Reserve on weekly basis
   * @param start Start date for the data in format [YYYY-MM-DD]
   * @param end End date for the data in format [YYYY-MM-DD]
   */
  totalAssets(start?: string, end?: string): Promise<BalanceSheetRecord[] | undefined>;
}
