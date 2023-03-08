import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { getAuthorizationToken } from "./siga.utils";

export function isAuthenticated(
	req: FastifyRequest,
	reply: FastifyReply,
	done: HookHandlerDoneFunction
) {
	const authorizationToken = getAuthorizationToken(req.headers);
	if (!authorizationToken) return reply.status(401).send({
		error: 'Token de autorização não foi especificado.'
	});

	done();
}