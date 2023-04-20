import { getPageHtml } from '~/test/utils/get-page-html.utils';
import { extractGXStateOfHTML } from '../utils/gxstate.utils';
import { getHistory } from './history.scrapper';

describe('History scrapper function', () => {
  it('should be able to get student history from HTML', () => {
    const historyHtmlContent = getPageHtml('history');

    const history = getHistory(extractGXStateOfHTML(historyHtmlContent));

    expect(history.length).toBeGreaterThanOrEqual(1);
    expect(history).toContainEqual(
      expect.objectContaining({
        cod: expect.any(String),
      }),
    );
  });
});
