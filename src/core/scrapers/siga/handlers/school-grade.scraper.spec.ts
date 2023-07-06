import { describe, expect, it } from 'vitest';

import { getPageHtml } from '~/test/utils/get-page-html.utils';

import { getStudentSchoolGrade } from './school-grade.scraper';

describe('History scrapper function', () => {
  it('should be able to get student history from HTML', () => {
    const schoolGradeHtmlContent = getPageHtml('historyGrade');

    const schoolGrade = getStudentSchoolGrade(schoolGradeHtmlContent);

    expect(schoolGrade.length).toBe(6);
    expect(schoolGrade).toContainEqual(
      expect.objectContaining({
        disciplines: expect.arrayContaining([
          expect.objectContaining({
            code: expect.any(String),
          }),
        ]),
      }),
    );
  });
});
