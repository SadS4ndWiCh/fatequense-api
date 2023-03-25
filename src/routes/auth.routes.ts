import type { FastifyInstance } from "fastify";

import { loginController } from "~/controllers/auth/login.controller";
import { useRateLimit } from "~/hooks/rate-limit.hook";

export async function authRoutes(app: FastifyInstance) {
	await useRateLimit(app, { max: 20, timeWindow: '1 minute' });

	app.post('/login', loginController);
}