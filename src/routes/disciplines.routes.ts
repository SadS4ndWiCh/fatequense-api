import { FastifyInstance, FastifyRequest } from 'fastify';

import * as student from '~/controllers/student';

import { useAuth } from '~/hooks/auth.hook';
import { useCache } from '~/hooks/cache.hook';
import { useRateLimit } from '~/hooks/rate-limit.hook';

import { env } from '~/utils/env.utils';
import { getAuthorizationToken } from '~/utils/get-authorization-token.utils';

const disciplineCacheKey = (req: FastifyRequest) => {
  const token = getAuthorizationToken(req.headers);

  if (!token) return null;

  return Buffer.from(`${token}${req.url}`, 'base64').toString('base64');
};

export async function disciplinesRoutes(app: FastifyInstance) {
  await useRateLimit(app, { max: env.MAX_RATE_LIMIT });

  const cache = useCache();
  const auth = useAuth();

  app.addHook('onRequest', auth.isAuthenticated);

  app.addHook('preHandler', cache.cached(disciplineCacheKey));
  app.addHook('onSend', cache.store(disciplineCacheKey));

  app.get('/:code', student.disciplines.disciplineController);
  app.get('/:code/lessons', student.disciplines.disciplineLessonsController);
  app.get('/:code/exams', student.disciplines.disciplineExamsController);
}
