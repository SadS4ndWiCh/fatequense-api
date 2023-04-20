import { getPageHtml } from '~/test/utils/get-page-html.utils';
import { extractGXStateOfHTML } from '../utils/gxstate.utils';
import { getDiscipline } from './discipline.scrapper';
import { MINIMUM_ATTENDANCE_PERCENTAGE } from '../../siga.consts';

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
