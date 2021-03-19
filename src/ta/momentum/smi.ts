/* eslint-disable no-plusplus, max-len, no-mixed-operators */

import _ from 'lodash';
import { EMAFunc } from '../moving-average';
import { HistoricalData } from '../../interfaces/ticker';

// prettier-ignore
const SMI = (period: number, emaPeriod: number, data: HistoricalData[] | undefined): number[] | Error => {
  if (!data) {
    return new Error('Data undefined.');
  }

  if (data.length < period) {
    return new Error('Not enough data to compute SMI for the target period.');
  }

  const result: number[] = [];
  const calculations: number = data.length - period;

  console.log(data.map((d) => d.high), calculations);

  // have day 1 - 15
  // now first 10 days
  // need get 7 8 9 10 for ema -> [6] to [9]
  // period + i - emaPeriod = 10 + 0 - 3 - 1 = 6
  for (let i = 0; i < calculations; i++) {
    const target: HistoricalData[] = _.slice(data, i, data.length - calculations + i + 1);
    const highestHigh: number = Number(_.max(target.map((r: HistoricalData) => Number(r.high))));
    const lowestLow: number = Number(_.min(target.map((r: HistoricalData) => Number(r.low))));
    const center: number = (highestHigh + lowestLow) / 2;

    const stochasticMomentum: HistoricalData[] = target.map((r: HistoricalData) => ({ ...r, close: r.close - center }));
    const priceRange: HistoricalData[] = target.map((r: HistoricalData) => ({ ...r, close: highestHigh - lowestLow }));

    try {
      const smoothedSM: number[] | Error = EMAFunc(emaPeriod, _.slice(stochasticMomentum, period - emaPeriod - 1 + i, period + i));

      let doubleSmoothedSM: number[] | Error = [];
      if (!(smoothedSM instanceof Error)) {
        doubleSmoothedSM = EMAFunc(
          emaPeriod,
          // eslint-disable-next-line object-curly-newline
          smoothedSM.map((r: number) => ({ open: 0, high: 0, low: 0, volume: 0, close: r, date: '' })),
        );
      }

      const smoothedPR: number[] | Error = EMAFunc(emaPeriod, _.slice(priceRange, period - emaPeriod - 1 + i, period + i));
      let doubleSmoothedPR: number[] | Error = [];
      if (!(smoothedPR instanceof Error)) {
        doubleSmoothedPR = EMAFunc(
          emaPeriod,
          // eslint-disable-next-line object-curly-newline
          smoothedPR.map((r: number) => ({ open: 0, high: 0, low: 0, volume: 0, close: r, date: '' })),
        );
      }

      console.log(doubleSmoothedSM, doubleSmoothedPR);

      if ((doubleSmoothedSM instanceof Array) && (doubleSmoothedPR instanceof Array)) {
        result.push((_.last(smoothedSM)) / (_.last(smoothedPR)) * 100);
      }
    } catch (error) {
      return new Error('Encountered error during SMI calculation. You can check if there is any invalid inputs.');
    }
  }

  return result;
};

export default SMI;
