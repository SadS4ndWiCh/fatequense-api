import type { FastifyRequest } from 'fastify';
import { getStudentHistory } from '~/core/scrapers/siga/handlers/history.scraper';
import { get } from '~/core/scrapers/siga/siga.network';

import { requestHeaderTokenSchema } from '~/libs/validations/token';

export async function historyController(req: FastifyRequest) {
  const { token } = requestHeaderTokenSchema.parse(req.headers);

  const { data: html } = await get({
    route: '/aluno/historicocompleto.aspx',
    token,
  });

  return getStudentHistory(html);
}
