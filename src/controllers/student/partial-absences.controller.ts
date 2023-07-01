import type { FastifyRequest } from 'fastify';
import { getStudentPartialAbsences } from '~/core/scrapers/siga/handlers/partial-absences.scraper';

import { get } from '~/libs/siga/siga.api';
import { requestHeaderTokenSchema } from '~/libs/validations/token';

export async function partialAbsencesController(req: FastifyRequest) {
  const { token } = requestHeaderTokenSchema.parse(req.headers);

  const { data: html } = await get({
    route: '/aluno/faltasparciais.aspx',
    token,
  });

  return getStudentPartialAbsences(html);
}
