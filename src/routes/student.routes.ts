import type { FastifyInstance } from 'fastify';

import * as student from '~/controllers/student';

import { useAuth } from '~/hooks/auth.hook';
import { useCache } from '~/hooks/cache.hook';
import { useRateLimit } from '~/hooks/rate-limit.hook';

import { cacheKey, cacheOptions } from '~/libs/cache';

import { env } from '~/utils/env.utils';

import { disciplinesRoutes } from './disciplines.routes';

export async function studentRoutes(app: FastifyInstance) {
  await useRateLimit(app, { max: env.MAX_RATE_LIMIT });

  const cache = useCache({ db: app.redis, cacheKey });
  const auth = useAuth();

  app.addHook('onRequest', auth.isAuthenticated);
  app.addHook('preHandler', cache.cached());

  app.get('/profile', cache.store(student.profileController, cacheOptions));
  app.patch('/profile/edit', student.editProfileController);
  app.get('/history', cache.store(student.historyController, cacheOptions));
  app.get('/schedule', cache.store(student.scheduleController, cacheOptions));
  app.get('/partial-grade', cache.store(student.partialGradeController));
  app.get('/partial-absences', cache.store(student.partialAbsencesController));
  app.get('/school-grade', cache.store(student.schoolGradeController));

  app.register(disciplinesRoutes, { prefix: '/disciplines' });
}
