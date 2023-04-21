import type { FastifyRequest } from 'fastify';

import { get } from '~/libs/siga/siga.api';
import { getHistory } from '~/libs/siga/scrappers/student/history.scrapper';
import { extractGXStateOfHTML } from '~/libs/siga/scrappers/utils/gxstate.utils';

export async function historyController(req: FastifyRequest) {
  const token = req.headers.token as string;

  const { data: html } = await get({
    route: '/aluno/historicocompleto.aspx',
    token,
  });

  const history = getHistory(extractGXStateOfHTML(html));

  return { history };
}
