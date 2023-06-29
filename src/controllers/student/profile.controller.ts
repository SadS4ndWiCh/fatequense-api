import type { FastifyRequest } from 'fastify';

import { db } from '~/libs/db';
import { getStudentProfile } from '~/libs/siga/scrappers/student/profile.scrapper';
import { extractGXStateOfHTML } from '~/libs/siga/scrappers/utils/gxstate.utils';
import { get } from '~/libs/siga/siga.api';

export async function profileController(req: FastifyRequest) {
  const token = req.headers.token as string;

  const { data: html } = await get({ route: '/aluno/home.aspx', token });

  const profile = getStudentProfile(extractGXStateOfHTML(html));

  const student = await db.student.findFirst({ where: { id: profile.ra } });

  return {
    profile: {
      ...profile,
      photoUrl: student?.photoUrl ?? profile.photoUrl,
    },
  };
}
