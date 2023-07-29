import type { FastifyRequest } from 'fastify';

import { getAllStudentDisciplines } from '~/core/scrapers/siga/handlers/all-disciplines.scraper';
import { get } from '~/core/scrapers/siga/siga.network';

import { requestHeaderTokenSchema } from '~/libs/validations/token';

export async function allDisciplineController(req: FastifyRequest) {
  const { token } = requestHeaderTokenSchema.parse(req.headers);

  const { data: html } = await get({
    route: '/aluno/horario.aspx',
    token,
  });

  return getAllStudentDisciplines(html);
}
