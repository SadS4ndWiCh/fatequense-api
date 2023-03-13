import { FastifyReply, FastifyRequest } from "fastify";

import { get } from "~/libs/siga/siga.api";
import { getPartialAbsences } from "~/libs/siga/scrappers/student/partialAbsences.scrapper";
import { extractGXStateOfHTML } from "~/libs/siga/scrappers/utils/gxstate.utils";
import { getAuthorizationToken } from "~/libs/siga/siga.utils";

import { AUTH_COOKIE_FIELD_NAME } from "~/libs/siga/siga.consts";

export async function partialAbsencesController(req: FastifyRequest, reply: FastifyReply) {
	const token = getAuthorizationToken(req.headers);

	const { data: html, success } = await get({
		route: 'partialAbsences',
		headers: {
			cookie: `${AUTH_COOKIE_FIELD_NAME}=${token}`
		}
	});

	if (!success) return reply.status(500).send({ error: 'Failed to fetch page' });

	const partialAbsences = getPartialAbsences(extractGXStateOfHTML(html));

	return { partialAbsences };
}