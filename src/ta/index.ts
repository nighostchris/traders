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
    const calculations = data.length - period + 1;

    for (let i = 0; i < calculations; i++) {
      result.push(
        _.round(_.sum(_.slice(data, i, i + period).map((d) => d.close)) / period, 2)
      );
    }

    return result;
  }
}

export default TechnicalAnalysisLibrary;
