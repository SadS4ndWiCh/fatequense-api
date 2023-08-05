import type { FastifyRedis } from '@fastify/redis';
import type { FastifyRequest } from 'fastify';

export type UseCacheProps = {
  db: FastifyRedis;
  cacheKey: (req: FastifyRequest) => string | null;
};

export type CacheStoreOptions = {
  expireIn?: number;
};

export type RouteController = (req: FastifyRequest) => Promise<unknown>;
