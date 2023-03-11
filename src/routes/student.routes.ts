import { FastifyInstance } from "fastify";

import { get } from "~/libs/siga/siga.api";
import { isAuthenticated } from "~/libs/siga/siga.validations";
import { getAuthorizationToken } from "~/libs/siga/siga.utils";
import { getStudentProfile } from "~/libs/siga/scrappers/student/profile.scrapper";
import { extractGXStateOfHTML } from "~/libs/siga/scrappers/utils/gxstate.utils";

import { AUTH_COOKIE_FIELD_NAME } from "~/libs/siga/siga.consts";
import { getSchedule } from "~/libs/siga/scrappers/student/schedule.scrapper";

export async function studentRoutes(app: FastifyInstance) {
	app.get('/profile', { preValidation: isAuthenticated }, async (req, reply) => {
		const token = getAuthorizationToken(req.headers);

		const { data: html, success } = await get({
			route: 'home',
			headers: {
				cookie: `${AUTH_COOKIE_FIELD_NAME}=${token}`
			}
		});

		if (!success) return reply.status(500).send({ error: 'Failed to fetch page' });

		const profile = getStudentProfile(extractGXStateOfHTML(html));
		if (!profile.success) return reply.status(500).send({ error: profile.error });

		return { profile: profile.data };
	});

	app.get('/schedule', { preValidation: isAuthenticated }, async (req, reply) => {
		const token = getAuthorizationToken(req.headers);

		const { data: html, success } = await get({
			route: 'schedule',
			headers: {
				cookie: `${AUTH_COOKIE_FIELD_NAME}=${token}`
			}
		});

		if (!success) return reply.status(500).send({ error: 'Failed to fetch page' });
		
		const schedule = getSchedule(extractGXStateOfHTML(html));
	
		return { schedule };
	});
}