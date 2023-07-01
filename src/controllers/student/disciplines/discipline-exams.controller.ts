import type { FastifyRequest } from 'fastify';
import { z } from 'zod';
import { getStudentPartialGrade } from '~/core/scrapers/siga/handlers/partial-grade.scraper';
import { get } from '~/core/scrapers/siga/siga.network';

import { requestHeaderTokenSchema } from '~/libs/validations/token';

const disciplineParamsSchema = z.object({
  code: z.string().min(1, 'Missing discipline code'),
});

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

  return examsDates;
}
