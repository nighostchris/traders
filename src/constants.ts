/* eslint-disable import/prefer-default-export */
export const YAHOO_FINANCE_URL = (ticker: string, modules: Array<string>) => {
  const mergeModules = modules.join(',');

  return `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?modules=${mergeModules}`;
};
