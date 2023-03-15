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

export async function studentRoutes(app: FastifyInstance) {
	const cache = useCache();
	const auth = useAuth();

	app.addHook('onRequest', cache.onRequest);
	app.addHook('onSend', cache.onSend);

	app.addHook('onRequest', auth.isAuthenticated);

	app.get('/profile', profileController);
	app.get('/history', historyController);
	app.get('/schedule', scheduleController);
	app.get('/partialGrade', partialGradeController);
	app.get('/partialAbsences', partialAbsencesController);
}