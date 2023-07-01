import { describe, expect, it } from 'vitest';

import { getPageHtml } from '~/test/utils/get-page-html.utils';

import { getStudentPartialAbsences } from './partial-absences.scraper';

describe('Partial Absences scrapper function', () => {
  it('should be able to get student partial absences from HTML', () => {
    const partialAbsencesHtmlContent = getPageHtml('partialAbsences');

    const partialAbsences = getStudentPartialAbsences(
      partialAbsencesHtmlContent,
    );

    expect(partialAbsences.length).toBeGreaterThanOrEqual(1);
    expect(partialAbsences).toContainEqual(
      expect.objectContaining({
        cod: expect.any(String),
      }),
    );
  });
});
