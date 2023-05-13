import type { FastifyRequest } from 'fastify';

import { getPartialGrade } from '~/libs/siga/scrappers/student/partial-grade.scrapper';
import { extractGXStateOfHTML } from '~/libs/siga/scrappers/utils/gxstate.utils';
import { get } from '~/libs/siga/siga.api';

export async function partialGradeController(req: FastifyRequest) {
  const token = req.headers.token as string;
  const { data: html } = await get({
    route: '/aluno/notasparciais.aspx',
    token,
  });

  const partialGrade = getPartialGrade(extractGXStateOfHTML(html));

  return { partialGrade };
}
