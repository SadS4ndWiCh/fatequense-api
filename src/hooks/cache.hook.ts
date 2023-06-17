import type {
  DoneFuncWithErrOrRes,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from 'fastify';
import NodeCache from 'node-cache';

const CACHE_TTL = 15;

function createCache() {
  const cache = new NodeCache();

  return {
    get: (key: string) => cache.get(key),
    set: (key: string, value: unknown) => cache.set(key, value, CACHE_TTL),
  };
}

export function useCache() {
  const cache = createCache();

  return {
    cached(cacheKey: (req: FastifyRequest) => string | null) {
      return (
        req: FastifyRequest,
        reply: FastifyReply,
        done: HookHandlerDoneFunction,
      ) => {
        if (req.method !== 'GET') return done();

        const key = cacheKey(req);
        if (!key) return done();

        const response = cache.get(key);
        if (!response) return done();

        return reply
          .status(200)
          .header('Content-Type', 'application/json; charset=utf-8')
          .send(response);
      };
    },
    store(cacheKey: (req: FastifyRequest) => string | null) {
      return (
        req: FastifyRequest,
        res: FastifyReply,
        payload: unknown,
        done: DoneFuncWithErrOrRes,
      ) => {
        if (
          req.method !== 'GET' ||
          res.statusCode < 200 ||
          res.statusCode > 299
        )
          return done();

        const key = cacheKey(req);
        if (!key) return done();

        cache.set(key, payload);
        done();
      };
    },
  };
}
