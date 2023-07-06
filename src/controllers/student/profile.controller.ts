import { eq } from 'drizzle-orm';
import type { FastifyRequest } from 'fastify';
import { db } from '~/db';
import { students } from '~/db/schema';

import { getStudentProfile } from '~/core/scrapers/siga/handlers/profile.scraper';
import { get } from '~/core/scrapers/siga/siga.network';

import { requestHeaderTokenSchema } from '~/libs/validations/token';

export async function profileController(req: FastifyRequest) {
  const { token } = requestHeaderTokenSchema.parse(req.headers);

  const { data: html } = await get({ route: '/aluno/home.aspx', token });

  const profile = getStudentProfile(html);

  const student = await db
    .select()
    .from(students)
    .where(eq(students.id, profile.ra));

  if (student.length === 1) {
    return {
      ...profile,
      photoUrl: student[0].photoUrl ? student[0].photoUrl : profile.photoUrl,
    };
  }

  return profile;
}
