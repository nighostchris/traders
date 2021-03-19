/* eslint-disable class-methods-use-this, no-plusplus */

import { SMIFunc } from './momentum';
import { SMAFunc, EMAFunc } from './moving-average';
import { HistoricalData } from '../interfaces/ticker';
import { ITechnicalAnalysisLibrary } from '../interfaces/ta';

// prettier-ignore
class TechnicalAnalysisLibrary implements ITechnicalAnalysisLibrary {
  SMA = (period: number, data: HistoricalData[] | undefined)
  : number[] | Error => SMAFunc(period, data);

  EMA = (period: number, data: HistoricalData[] | undefined)
    : number[] | Error => EMAFunc(period, data);

  SMI = (period: number, emaPeriod: number, data: HistoricalData[] | undefined)
    : number[] | Error => SMIFunc(period, emaPeriod, data);
}

export default TechnicalAnalysisLibrary;
