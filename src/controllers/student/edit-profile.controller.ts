import type { FastifyRequest } from 'fastify';

import { db } from '~/libs/db';
import { studentDatabaseSchema } from '~/libs/validations/db';

import { profileController } from './profile.controller';

export async function editProfileController(req: FastifyRequest) {
  const dataToUpdate = studentDatabaseSchema.parse(
    JSON.parse(req.body as string),
  );

  const profile = await profileController(req);

  await db.student.upsert({
    where: { id: profile.ra },
    update: { ...dataToUpdate },
    create: {
      id: profile.ra,
      ...dataToUpdate,
    },
  });

  return { ok: true };
}
