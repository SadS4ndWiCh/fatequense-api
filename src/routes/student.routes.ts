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

import { SigaError } from "~/libs/siga/errors/SigaError.error";

export async function studentRoutes(app: FastifyInstance) {
	const cache = useCache();
	const auth = useAuth();

	app.setErrorHandler((err, req, reply) => {
		if (err instanceof SigaError) {
			return reply.status(err.statusCode).send(err.serialize());
		}

		return reply.status(500).send({
			statusCode: 500,
			error: 'Internal Server Error'
		})
	});

	app.addHook('onRequest', auth.isAuthenticated);

	app.addHook('onRequest', cache.onRequest);
	app.addHook('onSend', cache.onSend);

	app.get('/profile', profileController);
	app.get('/history', historyController);
	app.get('/schedule', scheduleController);
	app.get('/partialGrade', partialGradeController);
	app.get('/partialAbsences', partialAbsencesController);
}