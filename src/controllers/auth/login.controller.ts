import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { post } from "~/libs/siga/siga.api";
import { AUTH_COOKIE_FIELD_NAME, PASS_INPUT_ID, STATUS_REDIRECT, USER_INPUT_ID } from "~/libs/siga/siga.consts";
import { parseCookie } from "~/utils/parse-cookie.utils";
import * as jwt from "~/utils/jwt.utils";

export const loginBodySchema = z.object({
	username: z.string().min(1),
	password: z.string().min(1)
});

export async function loginController(req: FastifyRequest, reply: FastifyReply) {
	const { username, password } = loginBodySchema.parse(req.body);

	const { res } = await post({
		route: 'login',
		data: {
			[USER_INPUT_ID]: username,
			[PASS_INPUT_ID]: password
		}
	});

	if (res.statusCode !== STATUS_REDIRECT) {
		return reply.status(400).send({ error: 'Failed to login' });
	}

	const cookies = parseCookie(String(res.headers['set-cookie']));

	const token = jwt.sign({
		payload: { session: cookies[AUTH_COOKIE_FIELD_NAME] }
	});

	return { token }
}