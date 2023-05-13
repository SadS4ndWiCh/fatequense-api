import type { FastifyRequest } from 'fastify';

import { getSchedule } from '~/libs/siga/scrappers/student/schedule.scrapper';
import { extractGXStateOfHTML } from '~/libs/siga/scrappers/utils/gxstate.utils';
import { get } from '~/libs/siga/siga.api';

export async function scheduleController(req: FastifyRequest) {
  const token = req.headers.token as string;

  const { data: html } = await get({ route: '/aluno/horario.aspx', token });

  const schedule = getSchedule(extractGXStateOfHTML(html));

  return { schedule };
}
