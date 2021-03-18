/* eslint-disable class-methods-use-this, no-plusplus */

import axios from 'axios';
import moment from 'moment';
import parser from 'xml2json';
import { FED_BALANCE_URL } from '../constants';
import {
  BalanceSheetRecord,
  BalanceSheetXML,
  BalanceSheetXMLObservation,
  IFEDBalanceSheet,
} from '../interfaces/fed';

// prettier-ignore
class FEDBalanceSheet implements IFEDBalanceSheet {
  async totalAssets(start?: string, end?: string): Promise<BalanceSheetRecord[] | undefined> {
    try {
      const fedBalanceXML = await axios.get(FED_BALANCE_URL);
      const fedBalanceInJson: BalanceSheetXML = JSON.parse(parser.toJson(fedBalanceXML.data));

      const result: BalanceSheetRecord[] = fedBalanceInJson.page.chart[0].series.observation
        .map((record: BalanceSheetXMLObservation) => ({
          date: moment(record.index, 'D-MMM-YY').format('YYYY-MM-DD'),
          value: Number(record.value)
        }));

      if (start && !end) {
        return result.filter((record) => moment(record.date).isSameOrAfter(moment(start)));
      } if (!start && end) {
        return result.filter((record) => moment(record.date).isSameOrBefore(moment(end)));
      } if (start && end) {
        return result.filter((record) => moment(record.date).isSameOrAfter(moment(start))
          && moment(record.date).isSameOrBefore(moment(end)));
      }

      return result;
    } catch (error) {
      return undefined;
    }
  }
}

export default FEDBalanceSheet;
