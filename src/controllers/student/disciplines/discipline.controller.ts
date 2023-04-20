import type { FastifyRequest } from 'fastify';
import { z } from 'zod';

import { get } from '~/libs/siga/siga.api';
import { extractGXStateOfHTML } from '~/libs/siga/scrappers/utils/gxstate.utils';
import { getDiscipline } from '~/libs/siga/scrappers/student/discipline.scrapper';

const disciplineParamsSchema = z.object({
  code: z.string().nonempty('Missing discipline code'),
});

export async function disciplineController(req: FastifyRequest) {
  const token = req.headers.token as string;
  const { code } = disciplineParamsSchema.parse(req.params);

  const { data: html } = await get({
    route: '/aluno/planoensino.aspx',
    params: code,
    token,
  });

  const discipline = getDiscipline(extractGXStateOfHTML(html));

  return { discipline };
}
