/* eslint-disable no-plusplus */

import _ from 'lodash';
import { HistoricalData } from '../../interfaces/ticker';

// prettier-ignore
const SMA = (period: number, data: HistoricalData[] | undefined): number[] | Error => {
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
};

export default SMA;
