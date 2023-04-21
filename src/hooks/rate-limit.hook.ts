import type { FastifyInstance } from 'fastify';
import type { RateLimitOptions } from '@fastify/rate-limit';

export async function useRateLimit(
  app: FastifyInstance,
  options: RateLimitOptions,
) {
  await app.register(import('@fastify/rate-limit'), options);
}
