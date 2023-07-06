import { describe, expect, it } from 'vitest';

import { getPageHtml } from '~/test/utils/get-page-html.utils';

import { getStudentHistory } from './history.scraper';

describe('History scrapper function', () => {
  it('should be able to get student history from HTML', () => {
    const historyHtmlContent = getPageHtml('history');

    const history = getStudentHistory(historyHtmlContent);

    expect(history.length).toBeGreaterThanOrEqual(1);
    expect(history).toContainEqual(
      expect.objectContaining({
        cod: expect.any(String),
      }),
    );
  });
});
