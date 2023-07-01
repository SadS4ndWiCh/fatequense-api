import type { FastifyRequest } from 'fastify';
import { getStudentPartialGrade } from '~/core/scrapers/siga/handlers/partial-grade.scraper';

import { get } from '~/libs/siga/siga.api';
import { requestHeaderTokenSchema } from '~/libs/validations/token';

export async function partialGradeController(req: FastifyRequest) {
  const { token } = requestHeaderTokenSchema.parse(req.headers);

  const { data: html } = await get({
    route: '/aluno/notasparciais.aspx',
    token,
  });

  return getStudentPartialGrade(html);
}
