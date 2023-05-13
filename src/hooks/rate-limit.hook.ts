import type { RateLimitOptions } from '@fastify/rate-limit';
import type { FastifyInstance } from 'fastify';

export async function useRateLimit(
  app: FastifyInstance,
  options: RateLimitOptions,
) {
  await app.register(import('@fastify/rate-limit'), options);
}
