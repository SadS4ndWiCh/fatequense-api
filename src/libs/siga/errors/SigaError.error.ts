import type { FastifyReply } from "fastify";

export class SigaError extends Error {
	public statusCode = 500;
	public errorTitle = 'Internal Server Error';
	public errorMessage = 'An unexpected error occurred. Try again soon.';

	serialize() {
		return {
			statusCode: this.statusCode,
			error: this.errorTitle,
			message: this.errorMessage,
		}
	}

	throwStatusError(reply: FastifyReply) {
		reply.status(this.statusCode).send(this.serialize());
	}
}