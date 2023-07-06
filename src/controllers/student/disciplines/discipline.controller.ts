import type { FastifyRequest } from 'fastify';

import { getStudentDiscipline } from '~/core/scrapers/siga/handlers/discipline.scraper';
import { get } from '~/core/scrapers/siga/siga.network';

import { disciplineParamsSchema } from '~/libs/validations/discipline';
import { requestHeaderTokenSchema } from '~/libs/validations/token';

export async function disciplineController(req: FastifyRequest) {
  const { token } = requestHeaderTokenSchema.parse(req.headers);
  const { code } = disciplineParamsSchema.parse(req.params);

  const { data: html } = await get({
    route: '/aluno/planoensino.aspx',
    params: code,
    token,
  });

  return getStudentDiscipline(html);
}
