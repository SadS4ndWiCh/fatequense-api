import { FastifyReply, FastifyRequest } from "fastify";

import { get } from "~/libs/siga/siga.api";
import { getPartialGrade } from "~/libs/siga/scrappers/student/partialGrade.scrapper";
import { extractGXStateOfHTML } from "~/libs/siga/scrappers/utils/gxstate.utils";
import { getAuthorizationToken } from "~/libs/siga/siga.utils";

export async function partialGradeController(req: FastifyRequest, reply: FastifyReply) {
	const token = getAuthorizationToken(req.headers)!;

	const { data: html, success } = await get({ route: 'partialGrade', token });

	if (!success) return reply.status(500).send({ error: 'Failed to fetch page' });

	const partialGrade = getPartialGrade(extractGXStateOfHTML(html));

	return { partialGrade };
}