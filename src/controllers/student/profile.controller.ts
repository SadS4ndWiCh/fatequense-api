import { FastifyReply, FastifyRequest } from "fastify";

import { get } from "~/libs/siga/siga.api";
import { getStudentProfile } from "~/libs/siga/scrappers/student/profile.scrapper";
import { extractGXStateOfHTML } from "~/libs/siga/scrappers/utils/gxstate.utils";

export async function profileController(req: FastifyRequest, reply: FastifyReply) {
	const token = req.headers.token as string;

	const { data: html, success } = await get({ route: 'home', token });

	if (!success) return reply.status(500).send({ error: 'Failed to fetch page' });

	const profile = getStudentProfile(extractGXStateOfHTML(html));

	return { profile };
}