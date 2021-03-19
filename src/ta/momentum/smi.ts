/* eslint-disable no-plusplus, max-len, no-mixed-operators */

import _ from 'lodash';
import { EMAFunc } from '../moving-average';
import { HistoricalData } from '../../interfaces/ticker';

const HH = (data: number[], period: number) => {
  const result: number[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i > period - 1) {
      result.push(_.max(_.slice(data, i - period + 1, i + 1))!);
    } else {
      result.push(_.max(_.slice(data, 0, i + 1))!);
    }
  }

  return result;
};

const LL = (data: number[], period: number) => {
  const result: number[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i > period - 1) {
      result.push(_.min(_.slice(data, i - period + 1, i + 1))!);
    } else {
      result.push(_.min(_.slice(data, 0, i + 1))!);
    }
  }

  return result;
};

// prettier-ignore
const SMI = (period: number, emaPeriod: number, data: HistoricalData[] | undefined): number[] | Error => {
  if (!data) {
    return new Error('Data undefined.');
  }

  if (data.length < period) {
    return new Error('Not enough data to compute SMI for the target period.');
  }

  const highestHigh: number[] = HH(data.map((r: HistoricalData) => r.high), period);
  const lowestLow: number[] = LL(data.map((r: HistoricalData) => r.low), period);

  const center: HistoricalData[] = highestHigh.map((high: number, index: number) => ({
    open: 0, high: 0, low: 0, volume: 0, close: (high + lowestLow[index]) / 2, date: ''
  }));
  const priceRange: HistoricalData[] = highestHigh.map((high: number, index: number) => ({
    open: 0, high: 0, low: 0, volume: 0, close: high - lowestLow[index], date: ''
  }));

  const stochasticMomentum: HistoricalData[] = data.map((r: HistoricalData, index: number) => ({
    ...r, close: r.close - center[index].close
  }));

  try {
    const smoothedSM: number[] | Error = EMAFunc(emaPeriod, stochasticMomentum);
    let doubleSmoothedSM: number[] | Error = [];
    if (!(smoothedSM instanceof Error)) {
      doubleSmoothedSM = EMAFunc(emaPeriod, smoothedSM.map((r: number) => ({
        open: 0, high: 0, low: 0, volume: 0, close: r, date: ''
      })));
    }

    const smoothedPR: number[] | Error = EMAFunc(emaPeriod, priceRange);
    let doubleSmoothedPR: number[] | Error = [];
    if (!(smoothedPR instanceof Error)) {
      doubleSmoothedPR = EMAFunc(emaPeriod, smoothedPR.map((r: number) => ({
        open: 0, high: 0, low: 0, volume: 0, close: r, date: ''
      })));
    }

    if (!(doubleSmoothedSM instanceof Error) && !(doubleSmoothedPR instanceof Error)) {
      const doubleSmoothedPRNumber: number[] = doubleSmoothedPR;

      return doubleSmoothedSM.map((r: number, index: number) => _.round(r / doubleSmoothedPRNumber[index] * 100, 2));
    }

    return Error('Encountered error during SMI calculation. You can check if there is any invalid inputs.');
  } catch (error) {
    return Error('Encountered error during SMI calculation. You can check if there is any invalid inputs.');
  }
};

export default SMI;
