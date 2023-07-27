import { FastifyInstance } from 'fastify';

import * as student from '~/controllers/student';

import { useAuth } from '~/hooks/auth.hook';
import { useCache } from '~/hooks/cache.hook';
import { useRateLimit } from '~/hooks/rate-limit.hook';

import { cacheKey } from '~/libs/cache';

import { env } from '~/utils/env.utils';

export async function disciplinesRoutes(app: FastifyInstance) {
  await useRateLimit(app, { max: env.MAX_RATE_LIMIT });

  const cache = useCache({ db: app.redis, cacheKey });
  const auth = useAuth();

  app.addHook('onRequest', auth.isAuthenticated);
  app.addHook('preHandler', cache.cached());

  app.get('/:code', cache.store(student.disciplines.disciplineController));
  app.get(
    '/:code/lessons',
    cache.store(student.disciplines.disciplineLessonsController),
  );
  app.get(
    '/:code/exams',
    cache.store(student.disciplines.disciplineExamsController),
  );
}
