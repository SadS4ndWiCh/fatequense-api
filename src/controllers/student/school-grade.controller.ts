import type { FastifyRequest } from 'fastify';

import { getStudentSchoolGrade } from '~/core/scrapers/siga/handlers/school-grade.scraper';
import { get } from '~/core/scrapers/siga/siga.network';

import { requestHeaderTokenSchema } from '~/libs/validations/token';

export async function schoolGradeController(req: FastifyRequest) {
  const { token } = requestHeaderTokenSchema.parse(req.headers);

  const { data: html } = await get({
    route: '/aluno/historicograde.aspx',
    token,
  });

  return getStudentSchoolGrade(html);
}
