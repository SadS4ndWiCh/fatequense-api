import { describe, expect, it } from 'vitest';

import { getPageHtml } from '~/test/utils/get-page-html.utils';

import { getAllStudentDisciplines } from './all-disciplines.scraper';

describe('All Disciplines scrapper function', () => {
  it('should be able to get all disciplines from HTML', () => {
    const scheduleHtmlContent = getPageHtml('schedule');

    const discipline = getAllStudentDisciplines(scheduleHtmlContent);

    expect(discipline).toContainEqual(
      expect.objectContaining({
        code: expect.any(String),
        name: expect.any(String),
        class: expect.any(String),
        teacherName: expect.any(String),
        workload: expect.any(Number),
        totalAbsencesAllowed: expect.any(Number),
      }),
    );
  });
});
