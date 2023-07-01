import { FastifyRequest } from 'fastify';
import {
  AUTH_COOKIE_FIELD_NAME,
  STATUS_REDIRECT,
} from '~/core/scrapers/siga/siga.constants';
import { get, post } from '~/core/scrapers/siga/siga.network';

import { requestHeaderTokenSchema } from '~/libs/validations/token';

import { FailedToLogout } from '~/core/scrapers/siga/errors/failed-to-logout.error';

import { extractGXStateOfHTML } from '~/core/scrapers/siga/utils/gxstate.utils';

async function getLogoutEvent(token: string) {
  const { data: html } = await get({
    route: '/aluno/home.aspx',
    token,
  });

  const { parsed: gxstate, prefix: gxstatePrefix } = extractGXStateOfHTML(html);

  return JSON.stringify({
    ...gxstate,
    _EventName: `${gxstatePrefix}E'SAIR'.`,
    sCallerURL: 'http://siga.cps.sp.gov.br/login.aspx',
  });
}

export async function logoutController(req: FastifyRequest) {
  const { token } = requestHeaderTokenSchema.parse(req.headers);

  const logoutEvent = await getLogoutEvent(token);

  const { res } = await post({
    route: '/aluno/home.aspx',
    headers: { cookie: `${AUTH_COOKIE_FIELD_NAME}=${token}` },
    data: { GXState: logoutEvent },
  });

  if (res.statusCode !== STATUS_REDIRECT) {
    throw new FailedToLogout();
  }

  return { ok: true };
}
