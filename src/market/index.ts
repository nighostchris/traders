/* eslint-disable class-methods-use-this, object-curly-newline */
import axios from 'axios';
import cheerio from 'cheerio';
import PromiseFTP from 'promise-ftp';

import { IMarket, ConstituentRecord } from '../interfaces/market';
import { NASDAQ_TRADER_URL, WIKI_SNP_COMPANIES_URL } from '../constants';
import { streamToString } from '../utils/stream';

class Market implements IMarket {
  async listNasdaq(): Promise<ConstituentRecord[] | undefined> {
    let rawNasdaqListing: string = '';
    const ftpClient: PromiseFTP = new PromiseFTP();

    await ftpClient.connect({ host: NASDAQ_TRADER_URL });

    // prettier-ignore
    const dataStream: NodeJS.ReadableStream = await ftpClient.get('/symboldirectory/nasdaqlisted.txt');

    rawNasdaqListing = await streamToString(dataStream);

    ftpClient.end();

    let nasdaqListing: string[] = rawNasdaqListing.split('\n');
    nasdaqListing = nasdaqListing.slice(1, nasdaqListing.length - 2);

    // prettier-ignore
    const postProcessedNasdaqListing: ConstituentRecord[] = nasdaqListing.map((ticker: string) => {
      const [symbol, name] = ticker.split('|');

      return { symbol, name: name.split(' - ')[0] };
    });

    return postProcessedNasdaqListing || undefined;
  }

  async listSNP(): Promise<ConstituentRecord[] | undefined> {
    const wikiData: ConstituentRecord[] = [];
    const wikiPage = await axios.get(WIKI_SNP_COMPANIES_URL);
    const $ = cheerio.load(wikiPage.data);

    // prettier-ignore
    $('table#constituents').each((_, e) => {
      $(e).find('tbody').each((__, company) => {
        let symbol: string = '';
        let name: string = '';

        $(company).find('tr').each((_, companyRow) => {
          $(companyRow).find('td').each((index, companyDetails) => {
            if (index % 9 === 0) {
              symbol = $(companyDetails).text();
            }
            if (index % 9 === 1) {
              name = $(companyDetails).text();
            }
          });

          if (symbol !== '' && name !== '') {
            wikiData.push({ symbol: symbol.replace(/\n/g, ''), name });
          }
        });
      });
    });

    return wikiData || undefined;
  }
}

export default Market;
