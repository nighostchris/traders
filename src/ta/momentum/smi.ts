/* eslint-disable no-plusplus */

// import _ from 'lodash';
import { HistoricalData } from '../../interfaces/ticker';

// prettier-ignore
const SMI = (period: number, data: HistoricalData[] | undefined): number[] | Error => {
  if (!data) {
    return new Error('Data undefined.');
  }

  if (data.length < period) {
    return new Error('Not enough data to compute SMI for the target period.');
  }

  const result: number[] = [];

  return result;
};

export default SMI;
