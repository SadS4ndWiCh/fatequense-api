import type { FastifyRequest } from 'fastify';
import { getStudentProfile } from '~/core/scrapers/siga/handlers/profile.scraper';
import { get } from '~/core/scrapers/siga/siga.network';

import { requestHeaderTokenSchema } from '~/libs/validations/token';

export async function profileController(req: FastifyRequest) {
  const { token } = requestHeaderTokenSchema.parse(req.headers);

  const { data: html } = await get({ route: '/aluno/home.aspx', token });

  return getStudentProfile(html);
}
