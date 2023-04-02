import type { FastifyInstance } from "fastify";

import { loginController } from "~/controllers/auth/login.controller";
import { logoutController } from "~/controllers/auth/logout.controller";
import { useAuth } from "~/hooks/auth.hook";
import { useRateLimit } from "~/hooks/rate-limit.hook";
import { SigaError } from "~/libs/siga/errors/SigaError.error";

export async function authRoutes(app: FastifyInstance) {
	const auth = useAuth();
	await useRateLimit(app, { max: 20, timeWindow: '1 minute' });

	app.setErrorHandler((err, req, reply) => {
		if (err instanceof SigaError) return err.throwStatusError(reply);
		else if (err?.statusCode === 429) return reply.status(429).send(err);

		return reply.status(500).send({
			statusCode: 500,
			error: 'Internal Server Error'
		})
	});

	app.post('/login', loginController);
	app.post('/logout', { onRequest: auth.isAuthenticated }, logoutController);
}