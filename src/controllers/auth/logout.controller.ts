import { FastifyReply, FastifyRequest } from "fastify";

import { get, post } from "~/libs/siga/siga.api";
import { extractGXStateOfHTML } from "~/libs/siga/scrappers/utils/gxstate.utils";
import { AUTH_COOKIE_FIELD_NAME, STATUS_REDIRECT } from "~/libs/siga/siga.consts";
import { FailedToLogout } from "~/libs/siga/errors/FailedToLogout.error";

async function getLogoutEvent(token: string) {
	const { data: html } = await get({
		route: '/aluno/home.aspx',
		token
	});

	const { parsed: gxstate, prefix: gxstatePrefix } = extractGXStateOfHTML(html);

	return JSON.stringify({
		...gxstate,
		_EventName: `${gxstatePrefix}E'SAIR'.`,
		sCallerURL: 'http://siga.cps.sp.gov.br/login.aspx',
	});
}

export async function logoutController(req: FastifyRequest, reply: FastifyReply) {
	const token = req.headers.token as string;

	const logoutEvent = await getLogoutEvent(token);

	const { res } = await post({
		route: '/aluno/home.aspx',
		headers: { cookie: `${AUTH_COOKIE_FIELD_NAME}=${token}` },
		data: { GXState: logoutEvent }
	});

	if (res.statusCode !== STATUS_REDIRECT) {
		throw new FailedToLogout();
	}

	return { ok: true }
}