import { describe, expect, it } from 'vitest';

import { getPageHtml } from '~/test/utils/get-page-html.utils';

import { getStudentPartialGrade } from './partial-grade.scraper';

describe('Partial Grade scrapper function', () => {
  it('should be able to get student partial grade from HTML', () => {
    const partialGradeHtmlContent = getPageHtml('partialGrade');

    const partialGrade = getStudentPartialGrade(partialGradeHtmlContent);

    expect(partialGrade.length).toBeGreaterThanOrEqual(1);
    expect(partialGrade).toContainEqual(
      expect.objectContaining({
        cod: expect.any(String),
      }),
    );
  });
});
