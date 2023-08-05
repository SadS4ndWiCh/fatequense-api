import type { FastifyReply, FastifyRequest } from 'fastify';
import type {
  CacheStoreOptions,
  RouteController,
  UseCacheProps,
} from '~/types/hooks';

export function useCache({ db, cacheKey }: UseCacheProps) {
  return {
    cached() {
      return async (req: FastifyRequest, reply: FastifyReply) => {
        if (req.method !== 'GET') return;

        const key = cacheKey(req);
        if (!key) return;

        const cachedPayload = await db.get(key);
        if (!cachedPayload) return;

        return reply
          .status(200)
          .header('Content-Type', 'application/json; charset=utf-8')
          .send(cachedPayload);
      };
    },
    store(controller: RouteController, options: CacheStoreOptions = {}) {
      return async (req: FastifyRequest) => {
        const payload = await controller(req);

        if (req.method !== 'GET' || !payload) return payload;

        const key = cacheKey(req);
        if (!key) return payload;

        await db.set(
          key,
          JSON.stringify(payload),
          'EX',
          options.expireIn ?? 60 * 60,
        ); // Expire in 1h

        return payload;
      };
    },
  };
}
