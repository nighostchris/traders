/* eslint-disable implicit-arrow-linebreak */
import moment from 'moment';

export const transformDateToTimestamp = (date: string): number =>
  moment(date).unix();

export const transformTimestampToDate = (timestamp: number): string =>
  moment.unix(timestamp).format('YYYY-MM-DD kk:mm:ss');
