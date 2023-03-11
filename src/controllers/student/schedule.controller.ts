import { FastifyReply, FastifyRequest } from "fastify";

import { get } from "~/libs/siga/siga.api";
import { getSchedule } from "~/libs/siga/scrappers/student/schedule.scrapper";
import { extractGXStateOfHTML } from "~/libs/siga/scrappers/utils/gxstate.utils";
import { getAuthorizationToken } from "~/libs/siga/siga.utils";

import { AUTH_COOKIE_FIELD_NAME } from "~/libs/siga/siga.consts";

export async function scheduleController(req: FastifyRequest, reply: FastifyReply) {
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
}