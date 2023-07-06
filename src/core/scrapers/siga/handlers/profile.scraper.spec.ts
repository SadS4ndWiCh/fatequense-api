import { describe, expect, it } from 'vitest';

import { getPageHtml } from '~/test/utils/get-page-html.utils';

import { getStudentProfile } from './profile.scraper';

describe('Profile scrapper function', () => {
  it('should be able to get student profile from HTML', () => {
    const homeHtmlContent = getPageHtml('home');

    const profile = getStudentProfile(homeHtmlContent);

    expect(profile.name).toBe('John Doe Roberto');
    expect(profile.institutionalEmail).toBe('examplemail111@fatec.sp.gov.br');
    expect(profile.photoUrl).toBe(
      'https://siga.cps.sp.gov.br/image//SUPERCOOLIMAGEFROMSTUDENTURLLL.TMB.JPG',
    );
  });
});
