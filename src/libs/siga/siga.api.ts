import type { IncomingHttpHeaders } from 'http2';
import { request } from 'urllib';

import { FailedToFetch } from './errors/failed-to-fetch.error';

import {
  AUTH_COOKIE_FIELD_NAME,
  BASE_URL,
  GX_STATE,
  ROUTES,
  STATUS_REDIRECT,
  USER_AGENT,
} from './siga.consts';

interface BuildRequestProps {
  method:
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'CONNECT'
    | 'OPTIONS'
    | 'TRACE'
    | 'PATCH';
  route: ValueOf<typeof ROUTES>;
  headers?: IncomingHttpHeaders;
  data?: any;
  params?: string;
}

type GetRequestProps = Omit<BuildRequestProps, 'method' | 'data'> & {
  token: string;
};

type PostRequestProps = Omit<BuildRequestProps, 'method'>;

export function buildRequest({
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

  return {
    url: url.href,
    options: {
      data,
      headers: { ...headers, 'user-agent': USER_AGENT, origin: BASE_URL },
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
