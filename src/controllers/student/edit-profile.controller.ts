import { eq } from 'drizzle-orm';
import type { FastifyRequest } from 'fastify';
import { db } from '~/db';
import { students } from '~/db/schema';

import { studentDatabaseSchema } from '~/libs/validations/db';

import { profileController } from './profile.controller';

export async function editProfileController(req: FastifyRequest) {
  const dataToUpdate = studentDatabaseSchema.parse(req.body);

  const profile = await profileController(req);

  const isStudentAlreadyRegistered =
    (await db.select().from(students).where(eq(students.id, profile.ra)))
      .length === 1;

  if (!isStudentAlreadyRegistered) {
    await db.insert(students).values({ id: profile.ra, ...dataToUpdate });
  } else {
    await db
      .update(students)
      .set(dataToUpdate)
      .where(eq(students.id, profile.ra));
  }

  return { ok: true };
}
