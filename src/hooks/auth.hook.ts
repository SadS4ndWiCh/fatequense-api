import { onRequestHookHandler } from "fastify"
import * as jwt from '~/utils/jwt.utils';

import { getAuthorizationToken } from "~/libs/siga/siga.utils"

type UseAuthResponse = {
	isAuthenticated: onRequestHookHandler,
}

export function useAuth(): UseAuthResponse {
	return {
		isAuthenticated(req, reply, done) {
			const token = getAuthorizationToken(req.headers);
			if (!token) return reply.status(401).send({
				error: 'Missing authorization token'
			});

			const payload = jwt.verify({ token });
			if (!payload) return reply.status(401).send({
				error: 'Invalid authorization token'
			});

			req.headers.token = payload.session;
			done();
		}
	}
}