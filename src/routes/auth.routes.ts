import type { FastifyInstance } from "fastify";

import { loginController } from "~/controllers/auth/login.controller";
import { logoutController } from "~/controllers/auth/logout.controller";
import { useAuth } from "~/hooks/auth.hook";
import { useRateLimit } from "~/hooks/rate-limit.hook";

export async function authRoutes(app: FastifyInstance) {
	const auth = useAuth();
	await useRateLimit(app, { max: 20, timeWindow: '1 minute' });

	app.post('/login', loginController);
	app.post('/logout', { onRequest: auth.isAuthenticated }, logoutController);
}