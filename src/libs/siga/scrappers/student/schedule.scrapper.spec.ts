import { extractGXStateOfHTML } from '../utils/gxstate.utils';
import { getPageHtml } from '~/test/utils/get-page-html.utils';

import { getSchedule } from './schedule.scrapper';

describe('Schedule scrapper function', () => {
  it('should be ablt to get student schedule from HTML', () => {
    const scheduleHtmlContent = getPageHtml('schedule');

    const schedule = getSchedule(extractGXStateOfHTML(scheduleHtmlContent));

    expect(schedule.length).toEqual(6);
    expect(schedule[0].length).toBeGreaterThanOrEqual(0);
    expect(schedule).toContainEqual(
      expect.arrayContaining([
        expect.objectContaining({
          cod: expect.any(String),
        }),
      ]),
    );
  });
});
