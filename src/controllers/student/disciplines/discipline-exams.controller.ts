import type { FastifyRequest } from 'fastify';

import { DisciplineNotFound } from '~/core/scrapers/siga/errors/discipline-not-found.error';
import { getStudentPartialGrade } from '~/core/scrapers/siga/handlers/partial-grade.scraper';
import { get } from '~/core/scrapers/siga/siga.network';

import { disciplineParamsSchema } from '~/libs/validations/discipline';
import { requestHeaderTokenSchema } from '~/libs/validations/token';

export async function disciplineExamsController(req: FastifyRequest) {
  const { token } = requestHeaderTokenSchema.parse(req.headers);
  const { code: disciplineCode } = disciplineParamsSchema.parse(req.params);

  const { data: html } = await get({
    route: '/aluno/notasparciais.aspx',
    token,
  });

  const examsDates = getStudentPartialGrade(html).find(
    (discipline) => discipline.cod === disciplineCode,
  )?.examsDates;

  if (!examsDates) {
    throw new DisciplineNotFound();
  }

  return examsDates;
}
