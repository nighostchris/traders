/* eslint-disable no-plusplus */

import _ from 'lodash';

import SMA from './sma';
import { HistoricalData } from '../../interfaces/ticker';

// prettier-ignore
const EMA = (period: number, data: HistoricalData[] | undefined): number[] | Error => {
  if (!data) {
    return new Error('Data undefined.');
  }

  if (data.length - 1 < period) {
    return new Error('Not enough data to compute EMA for the target period.');
  }

  const result: number[] = [];
  const multiplier: number = 2 / (period + 1);
  const sma: number[] | Error = SMA(period, _.slice(data, 0, period));

  if (!(sma instanceof Error)) {
    let baseEMA = sma[0];

    for (let i = period; i < data.length; i++) {
      const currentEMA = multiplier * Number(data[i].close) + (1 - multiplier) * baseEMA;

      result.push(currentEMA);

      baseEMA = currentEMA;
    }
  }

  return result;
};

export default EMA;
