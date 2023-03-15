import { FastifyReply, FastifyRequest } from "fastify";

import { get } from "~/libs/siga/siga.api";
import { getHistory } from "~/libs/siga/scrappers/student/history.scrapper";
import { extractGXStateOfHTML } from "~/libs/siga/scrappers/utils/gxstate.utils";

export async function historyController(req: FastifyRequest, reply: FastifyReply) {
	const token = req.headers.token as string;

	const { data: html, success } = await get({ route: 'history', token });

	if (!success) return reply.status(500).send({ error: 'Failed to fetch page' });

	const history = getHistory(extractGXStateOfHTML(html));

	return { history };
}