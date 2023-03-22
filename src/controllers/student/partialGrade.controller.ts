import { FastifyReply, FastifyRequest } from "fastify";

import { get } from "~/libs/siga/siga.api";
import { getPartialGrade } from "~/libs/siga/scrappers/student/partialGrade.scrapper";
import { extractGXStateOfHTML } from "~/libs/siga/scrappers/utils/gxstate.utils";

export async function partialGradeController(req: FastifyRequest, reply: FastifyReply) {
	const token = req.headers.token as string;

	const { data: html } = await get({ route: 'partialGrade', token });

	const partialGrade = getPartialGrade(extractGXStateOfHTML(html));

	return { partialGrade };
}