import { request } from 'urllib';
// import UserAgent from 'user-agents';
import {
  BuildRequestProps,
  GetRequestProps,
  PostRequestProps,
} from '~/types/core';

import { FailedToFetch } from './errors/failed-to-fetch.error';

import {
  AUTH_COOKIE_FIELD_NAME,
  BASE_URL,
  GX_STATE,
  STATUS_REDIRECT,
  USER_AGENTS,
} from './siga.constants';

function buildRequest({
  method,
  route,
  headers = {},
  data = {},
  params = '',
}: BuildRequestProps) {
  const url = new URL(route, BASE_URL);
  url.search = params;

  if (method.toLowerCase() === 'post') {
    headers['content-type'] = 'application/x-www-form-urlencoded';
    data = data.GXState ? data : { ...data, GXState: GX_STATE };
  }

  const userAgent = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];

  return {
    url: url.href,
    options: {
      data,
      headers: {
        'user-agent': userAgent,
        origin: BASE_URL,
        ...headers,
      },
      method,
      maxRedirects: 0,
    },
  };
}

export async function get({ route, token, headers, params }: GetRequestProps) {
  const req = buildRequest({
    route,
    method: 'GET',
    headers: {
      cookie: `${AUTH_COOKIE_FIELD_NAME}=${token}`,
      ...headers,
    },
    params,
  });

  const { data, res } = await request(req.url, req.options);
  const success = res.statusCode !== STATUS_REDIRECT;

  if (!success) {
    throw new FailedToFetch();
  }

  return {
    data: data.toString('utf-8'),
  };
}

export async function post({ route, data, headers, params }: PostRequestProps) {
  const req = buildRequest({
    method: 'POST',
    route,
    data,
    headers,
    params,
  });

  return await request(req.url, req.options);
}
