import type { FastifyInstance, FastifyRequest } from 'fastify';

import * as student from '~/controllers/student';

import { useAuth } from '~/hooks/auth.hook';
import { useCache } from '~/hooks/cache.hook';
import { useRateLimit } from '~/hooks/rate-limit.hook';

import { env } from '~/utils/env.utils';
import { getAuthorizationToken } from '~/utils/get-authorization-token.utils';

import { disciplinesRoutes } from './disciplines.routes';

const studentCacheKey = (req: FastifyRequest) => {
  const token = getAuthorizationToken(req.headers);

  if (!token || req.routerPath.includes('/disciplines/:code')) return null;

  return `${token}-${req.routerPath}`;
};

export async function studentRoutes(app: FastifyInstance) {
  await useRateLimit(app, { max: env.MAX_RATE_LIMIT });

  const cache = useCache();
  const auth = useAuth();

  app.addHook('onRequest', auth.isAuthenticated);

  app.addHook('preHandler', cache.cached(studentCacheKey));
  app.addHook('onSend', cache.store(studentCacheKey));

  app.get('/profile', student.profileController);
  app.patch('/profile/edit', student.editProfileController);
  app.get('/history', student.historyController);
  app.get('/schedule', student.scheduleController);
  app.get('/partial-grade', student.partialGradeController);
  app.get('/partial-absences', student.partialAbsencesController);
  app.get('/school-grade', student.schoolGradeController);

  app.register(disciplinesRoutes, { prefix: '/disciplines' });
}
