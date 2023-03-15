import { FastifyInstance } from "fastify";

import { loginController } from "~/controllers/auth/login.controller";

export async function authRoutes(app: FastifyInstance) {
	app.post('/login', loginController);
}