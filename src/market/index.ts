/* eslint-disable class-methods-use-this, object-curly-newline */
import PromiseFTP from 'promise-ftp';

import { IMarket, NasdaqRecord } from '../interfaces/market';
import { NASDAQ_TRADER_URL } from '../constants';
import { streamToString } from '../utils/stream';

class Market implements IMarket {
  async listNasdaq(): Promise<Array<NasdaqRecord> | undefined> {
    let rawNasdaqListing: string = '';
    const ftpClient = new PromiseFTP();

    await ftpClient.connect({ host: NASDAQ_TRADER_URL });

    // prettier-ignore
    const dataStream: NodeJS.ReadableStream = await ftpClient.get('/symboldirectory/nasdaqlisted.txt');

    rawNasdaqListing = await streamToString(dataStream);

    ftpClient.end();

    let nasdaqListing = rawNasdaqListing.split('\n');
    nasdaqListing = nasdaqListing.slice(1, nasdaqListing.length - 2);

    const postProcessedNasdaqListing = nasdaqListing.map((ticker: string) => {
      const [symbol, name] = ticker.split('|');

      return { symbol, name: name.split(' - ')[0] };
    });

    return postProcessedNasdaqListing || undefined;
  }
}

export default Market;
