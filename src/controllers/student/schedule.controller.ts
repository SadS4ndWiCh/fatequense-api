import { FastifyReply, FastifyRequest } from "fastify";

import { get } from "~/libs/siga/siga.api";
import { getSchedule } from "~/libs/siga/scrappers/student/schedule.scrapper";
import { extractGXStateOfHTML } from "~/libs/siga/scrappers/utils/gxstate.utils";

export async function scheduleController(req: FastifyRequest, reply: FastifyReply) {
	const token = req.headers.token as string;

	const { data: html, success } = await get({ route: 'schedule', token });

	if (!success) return reply.status(500).send({ error: 'Failed to fetch page' });
	
	const schedule = getSchedule(extractGXStateOfHTML(html));

	return { schedule };
}