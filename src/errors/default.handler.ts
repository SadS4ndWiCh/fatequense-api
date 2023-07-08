import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { SigaError } from '~/core/scrapers/siga/errors/siga-error.error';

export function defaultErrorHandler(
  err: FastifyError,
  req: FastifyRequest,
  reply: FastifyReply,
) {
  if (err instanceof SigaError) return err.throwStatusError(reply);
  else if (err?.statusCode === 429) return reply.status(429).send(err);
  else if (err instanceof z.ZodError) return reply.status(500).send(err.issues);

  return reply.status(500).send({
    statusCode: 500,
    error: 'Internal Server Error',
    message: err.message,
  });
}
