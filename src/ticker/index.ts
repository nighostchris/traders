import axios, { AxiosResponse } from 'axios';
import { YAHOO_FINANCE_URL } from '../constants';

import { LiveQuoteData, ITicker } from '../interfaces/ticker';

class Ticker implements ITicker {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  async liveQuote(): Promise<LiveQuoteData | undefined> {
    const URL = YAHOO_FINANCE_URL(this.name, ['price']);

    try {
      const response: AxiosResponse<any> = await axios.get(URL);

      const liveQuoteResult = response.data.quoteSummary.result[0].price;
      console.log(liveQuoteResult);
      return {
        open: liveQuoteResult.regularMarketOpen.fmt,
        price: liveQuoteResult.regularMarketPrice.fmt,
        high: liveQuoteResult.regularMarketDayHigh.fmt,
        low: liveQuoteResult.regularMarketDayLow.fmt,
        volume: liveQuoteResult.regularMarketVolume.fmt,
        change: liveQuoteResult.regularMarketChange.fmt,
        changePercent: liveQuoteResult.regularMarketChangePercent.fmt,
      };
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}

export default Ticker;
