import type { FastifyRequest } from 'fastify';

import { getStudentSchedule } from '~/core/scrapers/siga/handlers/schedule.scraper';
import { get } from '~/core/scrapers/siga/siga.network';

import { requestHeaderTokenSchema } from '~/libs/validations/token';

export async function scheduleController(req: FastifyRequest) {
  const { token } = requestHeaderTokenSchema.parse(req.headers);

  const { data: html } = await get({ route: '/aluno/horario.aspx', token });

  return getStudentSchedule(html);
}
