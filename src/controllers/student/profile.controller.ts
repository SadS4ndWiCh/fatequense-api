import type { FastifyReply, FastifyRequest } from "fastify";

import { get } from "~/libs/siga/siga.api";
import { getStudentProfile } from "~/libs/siga/scrappers/student/profile.scrapper";
import { extractGXStateOfHTML } from "~/libs/siga/scrappers/utils/gxstate.utils";

export async function profileController(req: FastifyRequest, reply: FastifyReply) {
	const token = req.headers.token as string;

	const { data: html } = await get({ route: '/aluno/home.aspx', token });

	const profile = getStudentProfile(extractGXStateOfHTML(html));

	return { profile };
}