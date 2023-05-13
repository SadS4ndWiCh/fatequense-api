import type { FastifyRequest } from 'fastify';
import { z } from 'zod';

import { FailedToLogin } from '~/libs/siga/errors/failed-to-login.error';
import { post } from '~/libs/siga/siga.api';
import {
  AUTH_COOKIE_FIELD_NAME,
  PASS_INPUT_ID,
  STATUS_REDIRECT,
  USER_INPUT_ID,
} from '~/libs/siga/siga.consts';

import * as jwt from '~/utils/jwt.utils';
import { parseCookie } from '~/utils/parse-cookie.utils';

export const loginBodySchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function loginController(req: FastifyRequest) {
  const { username, password } = loginBodySchema.parse(req.body);

  const { res } = await post({
    route: '/aluno/login.aspx',
    data: {
      [USER_INPUT_ID]: username,
      [PASS_INPUT_ID]: password,
    },
  });

  if (res.statusCode !== STATUS_REDIRECT) throw new FailedToLogin();

  const cookies = parseCookie(String(res.headers['set-cookie']));

  const token = jwt.sign({
    payload: { session: cookies[AUTH_COOKIE_FIELD_NAME] },
  });

  return { token };
}
