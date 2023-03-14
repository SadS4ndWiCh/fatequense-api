import { FastifyInstance } from "fastify";

import {
	historyController,
	partialAbsencesController,
	partialGradeController,
	profileController,
	scheduleController
} from "~/controllers/student";
import { useCache } from "~/hooks/cache.hook";
import { isAuthenticated } from "~/libs/siga/siga.validations";

export async function studentRoutes(app: FastifyInstance) {
	const cache = useCache();

	app.addHook('onRequest', cache.onRequest);
	app.addHook('onSend', cache.onSend);

	app.get('/profile', { preValidation: isAuthenticated }, profileController);
	app.get('/history', { preValidation: isAuthenticated }, historyController);
	app.get('/schedule', { preValidation: isAuthenticated }, scheduleController);
	app.get('/partialGrade', { preValidation: isAuthenticated }, partialGradeController);
	app.get('/partialAbsences', { preValidation: isAuthenticated }, partialAbsencesController);
}