import type { FastifyInstance } from "fastify";

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

export async function studentRoutes(app: FastifyInstance) {
	await useRateLimit(app, { max: 20 });

	const cache = useCache();
	const auth = useAuth();

	app.addHook('onRequest', auth.isAuthenticated);

	app.addHook('preHandler', cache.onRequest);
	app.addHook('onSend', cache.onSend);

	app.get('/profile', profileController);
	app.get('/history', historyController);
	app.get('/schedule', scheduleController);
	app.get('/partialGrade', partialGradeController);
	app.get('/partialAbsences', partialAbsencesController);
}