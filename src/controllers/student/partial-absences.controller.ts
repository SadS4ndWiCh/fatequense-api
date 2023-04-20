import type { FastifyRequest } from 'fastify';

import { get } from '~/libs/siga/siga.api';
import { getPartialAbsences } from '~/libs/siga/scrappers/student/partial-absences.scrapper';
import { extractGXStateOfHTML } from '~/libs/siga/scrappers/utils/gxstate.utils';

export async function partialAbsencesController(req: FastifyRequest) {
  const token = req.headers.token as string;

  const { data: html } = await get({
    route: '/aluno/faltasparciais.aspx',
    token,
  });

  const partialAbsences = getPartialAbsences(extractGXStateOfHTML(html));

  return { partialAbsences };
}
