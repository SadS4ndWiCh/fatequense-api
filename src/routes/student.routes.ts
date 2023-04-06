import type { FastifyInstance } from "fastify";

import * as student from "~/controllers/student";
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

	app.get('/profile', student.profileController);
	app.get('/history', student.historyController);
	app.get('/schedule', student.scheduleController);
	app.get('/partialGrade', student.partialGradeController);
	app.get('/partialAbsences', student.partialAbsencesController);

	app.get('/disciplines/:code', student.disciplines.disciplineController);
	app.get('/disciplines/:code/lessons', student.disciplines.disciplineLessonsController);
}