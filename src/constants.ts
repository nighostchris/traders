/* eslint-disable import/prefer-default-export, implicit-arrow-linebreak */

// prettier-ignore
export const YAHOO_FINANCE_QUOTE_SUMMARY_URL = (
  ticker: string,
  modules: Array<string>
) => `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?modules=${modules.join(',')}`;

// prettier-ignore
export const YAHOO_FINANCE_CHART_URL = (
  ticker: string,
  interval: string,
  start: string,
  end: string
) => `https://query2.finance.yahoo.com/v8/finance/chart/${ticker}?interval=${interval}&period1=${start}&period2=${end}`;

// prettier-ignore
export const NASDAQ_TRADER_URL = 'ftp.nasdaqtrader.com';
