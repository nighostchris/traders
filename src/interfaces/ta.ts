/* eslint-disable no-unused-vars */

import { HistoricalData } from './ticker';

/**
 * Interface for TechnicalAnalysisLibrary class
 */
export interface ITechnicalAnalysisLibrary {
  /**
   * Calculates the average of a selected range of prices, usually closing prices,
   * by the number of periods in that range. (credit to Investopia)
   * @param period Target time period for calculating moving average
   * @param data An array of HistoricalData providing the required stock closing prices
   */
  SMA(period: number, data: HistoricalData[] | undefined): number[] | Error;
}
