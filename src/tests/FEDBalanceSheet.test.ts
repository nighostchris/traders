/* eslint-disable no-undef */
import { FEDBalanceSheet } from '../index';

test('- Test FEDBalanceSheet.totalAsset("2010-03-24", "2010-04-28")', async () => {
  const fed = new FEDBalanceSheet();

  const result = await fed.totalAssets('2010-03-24', '2010-04-28');

  if (result) {
    expect(result[0].date).toBe('2010-03-24');
    expect(result[0].value).toBe(2313149);
    expect(result[result.length - 1].date).toBe('2010-04-28');
    expect(result[result.length - 1].value).toBe(2330472);
  } else {
    expect(result).toBe(undefined);
  }
});
