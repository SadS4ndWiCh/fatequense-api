import type { FastifyReply, FastifyRequest } from "fastify";

import { get } from "~/libs/siga/siga.api";
import { getPartialGrade } from "~/libs/siga/scrappers/student/partial-grade.scrapper";
import { extractGXStateOfHTML } from "~/libs/siga/scrappers/utils/gxstate.utils";
import { z } from "zod";

const disciplineParamsSchema = z.object({
	code: z.string().nonempty('Missing discipline code'),
});

export async function disciplineExamsController(req: FastifyRequest, reply: FastifyReply) {
	const token = req.headers.token as string;
	const { code: disciplineCode } = disciplineParamsSchema.parse(req.params);

	const { data: html } = await get({ route: '/aluno/notasparciais.aspx', token });

	const examsDates = getPartialGrade(extractGXStateOfHTML(html))
		.find(discipline => discipline.cod === disciplineCode)
		?.examsDates;

	return { examsDates };
}