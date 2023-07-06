import type { FastifyRequest } from 'fastify';

import { DisciplineNotFound } from '~/core/scrapers/siga/errors/discipline-not-found.error';
import { getStudentPartialAbsences } from '~/core/scrapers/siga/handlers/partial-absences.scraper';
import { get } from '~/core/scrapers/siga/siga.network';

import { disciplineParamsSchema } from '~/libs/validations/discipline';
import { requestHeaderTokenSchema } from '~/libs/validations/token';

export async function disciplineLessonsController(req: FastifyRequest) {
  const { token } = requestHeaderTokenSchema.parse(req.headers);
  const { code: disciplineCode } = disciplineParamsSchema.parse(req.params);

  const { data: html } = await get({
    route: '/aluno/faltasparciais.aspx',
    token,
  });

  const disciplineLessons = getStudentPartialAbsences(html).find(
    (discipline) => discipline.cod === disciplineCode,
  )?.lessons;

  if (!disciplineLessons) {
    throw new DisciplineNotFound();
  }

  return disciplineLessons;
}
