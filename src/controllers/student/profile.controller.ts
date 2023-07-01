import type { FastifyRequest } from 'fastify';
import { getStudentProfile } from '~/core/scrapers/siga/handlers/profile.scraper';

import { get } from '~/libs/siga/siga.api';
import { requestHeaderTokenSchema } from '~/libs/validations/token';

export async function profileController(req: FastifyRequest) {
  const { token } = requestHeaderTokenSchema.parse(req.headers);

  const { data: html } = await get({ route: '/aluno/home.aspx', token });

  return getStudentProfile(html);
}
