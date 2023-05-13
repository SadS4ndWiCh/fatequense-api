import type { FastifyRequest } from 'fastify';
import { z } from 'zod';

import { DisciplineNotFound } from '~/libs/siga/errors/discipline-not-found.error';
import { getPartialAbsences } from '~/libs/siga/scrappers/student/partial-absences.scrapper';
import { extractGXStateOfHTML } from '~/libs/siga/scrappers/utils/gxstate.utils';
import { get } from '~/libs/siga/siga.api';

const disciplineParamsSchema = z.object({
  code: z.string().nonempty('Missing discipline code'),
});

export async function disciplineLessonsController(req: FastifyRequest) {
  const token = req.headers.token as string;
  const { code: disciplineCode } = disciplineParamsSchema.parse(req.params);

  const { data: html } = await get({
    route: '/aluno/faltasparciais.aspx',
    token,
  });

  const disciplineLessons = getPartialAbsences(extractGXStateOfHTML(html)).find(
    (discipline) => discipline.cod === disciplineCode,
  )?.lessons;

  if (!disciplineLessons) {
    throw new DisciplineNotFound();
  }

  return { lessons: disciplineLessons };
}
