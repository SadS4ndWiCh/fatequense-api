import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { SigaError } from "~/libs/siga/errors/siga-error.error";

export function defaultErrorHandler(err: FastifyError, req: FastifyRequest, reply: FastifyReply) {
	if (err instanceof SigaError) return err.throwStatusError(reply);
	else if (err?.statusCode === 429) return reply.status(429).send(err);

	return reply.status(500).send({
		statusCode: 500,
		error: 'Internal Server Error'
	})
}