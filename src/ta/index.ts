/* eslint-disable class-methods-use-this, no-plusplus */

import _ from 'lodash';
import { HistoricalData } from '../interfaces/ticker';
import { ITechnicalAnalysisLibrary } from '../interfaces/ta';

// prettier-ignore
class TechnicalAnalysisLibrary implements ITechnicalAnalysisLibrary {
  SMA(period: number, data: HistoricalData[] | undefined): number[] | Error {
    if (!data) {
      return new Error('Data undefined.');
    }

    if (data.length < period) {
      return new Error('Not enough data to compute SMA for the target period.');
    }

    const result: number[] = [];
    const calculations: number = data.length - period + 1;

    for (let i = 0; i < calculations; i++) {
      result.push(
        _.round(_.sum(_.slice(data, i, i + period).map((d) => d.close)) / period, 2)
      );
    }

    return result;
  }

  EMA(period: number, data: HistoricalData[] | undefined): number[] | Error {
    if (!data) {
      return new Error('Data undefined.');
    }

    if (data.length - 1 < period) {
      return new Error('Not enough data to compute SMA for the target period.');
    }

    const result: number[] = [];
    const multiplier: number = 2 / (period + 1);
    const sma: number[] | Error = this.SMA(period, _.slice(data, 0, period));

    if (!(sma instanceof Error)) {
      let baseEMA = _.round(sma[0], 2);

      for (let i = period; i < data.length; i++) {
        console.log(data[i].close);
        const currentEMA = multiplier * Number(data[i].close) + (1 - multiplier) * baseEMA;

        console.log(currentEMA);

        result.push(currentEMA);

        baseEMA = currentEMA;
      }
    }

    return result;
  }
}

export default TechnicalAnalysisLibrary;
