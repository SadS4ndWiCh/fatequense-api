import { extractGXStateOfHTML } from '../utils/gxstate.utils';
import { getPageHtml } from '~/test/utils/get-page-html.utils';

import { MINIMUM_ATTENDANCE_PERCENTAGE } from '../../siga.consts';
import { getDiscipline } from './discipline.scrapper';

describe('Discipline scrapper function', () => {
  it('should be able to get student discipline details from HTML', () => {
    const disciplineHtmlContent = getPageHtml('discipline');

    const discipline = getDiscipline(
      extractGXStateOfHTML(disciplineHtmlContent),
    );

    const totalWorkload = discipline.workload.total;
    const expectTotalAbsencesAllowed =
      totalWorkload - totalWorkload * MINIMUM_ATTENDANCE_PERCENTAGE;

    expect(discipline.code).toBe('IES300');
    expect(discipline.class).toBe('A');
    expect(discipline.totalAbsencesAllowed).toBe(expectTotalAbsencesAllowed);
  });
});
