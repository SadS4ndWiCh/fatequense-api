import { describe, expect, it } from 'vitest';

import { getPageHtml } from '~/test/utils/get-page-html.utils';

import { MINIMUM_ATTENDANCE_PERCENTAGE } from '../siga.constants';
import { getStudentDiscipline } from './discipline.scraper';

describe('Discipline scrapper function', () => {
  it('should be able to get student discipline details from HTML', () => {
    const disciplineHtmlContent = getPageHtml('discipline');

    const discipline = getStudentDiscipline(disciplineHtmlContent);

    const totalWorkload = discipline.workload.total;
    const expectTotalAbsencesAllowed =
      totalWorkload - totalWorkload * MINIMUM_ATTENDANCE_PERCENTAGE;

    expect(discipline.code).toBe('IES300');
    expect(discipline.class).toBe('A');
    expect(discipline.totalAbsencesAllowed).toBe(expectTotalAbsencesAllowed);
  });
});
