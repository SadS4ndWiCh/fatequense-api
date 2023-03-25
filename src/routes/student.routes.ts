import { FastifyInstance } from "fastify";

import {
	historyController,
	partialAbsencesController,
	partialGradeController,
	profileController,
	scheduleController
} from "~/controllers/student";
import { useAuth } from "~/hooks/auth.hook";
import { useCache } from "~/hooks/cache.hook";
import { useRateLimit } from "~/hooks/rate-limit.hook";

import { SigaError } from "~/libs/siga/errors/SigaError.error";

export async function studentRoutes(app: FastifyInstance) {
	await useRateLimit(app, { max: 2 });

	const cache = useCache();
	const auth = useAuth();

	app.setErrorHandler((err, req, reply) => {
		if (err instanceof SigaError) {
			return reply.status(err.statusCode).send(err.serialize());
		} else if (err?.statusCode === 429) {
			return reply.status(429).send(err);
		}

		return reply.status(500).send({
			statusCode: 500,
			error: 'Internal Server Error'
		})
	});

	app.addHook('onRequest', auth.isAuthenticated);

	app.addHook('preHandler', cache.onRequest);
	app.addHook('onSend', cache.onSend);

	app.get('/profile', profileController);
	app.get('/history', historyController);
	app.get('/schedule', scheduleController);
	app.get('/partialGrade', partialGradeController);
	app.get('/partialAbsences', partialAbsencesController);
}