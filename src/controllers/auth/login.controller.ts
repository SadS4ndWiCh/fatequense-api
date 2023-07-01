import type { FastifyRequest } from 'fastify';

import { FailedToLogin } from '~/core/scrapers/siga/errors/failed-to-login.error';
import {
  AUTH_COOKIE_FIELD_NAME,
  PASS_INPUT_ID,
  STATUS_REDIRECT,
  USER_INPUT_ID,
} from '~/core/scrapers/siga/siga.constants';
import { post } from '~/core/scrapers/siga/siga.network';

import { cookieSchema, loginBodySchema } from '~/libs/validations/auth';

import * as jwt from '~/utils/jwt.utils';
import { parseCookie } from '~/utils/parse-cookie.utils';

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

  const { [AUTH_COOKIE_FIELD_NAME]: session } = cookieSchema.parse(
    parseCookie(String(res.headers['set-cookie'])),
  );

  const token = jwt.sign({ payload: { session } });

  return { token };
}
