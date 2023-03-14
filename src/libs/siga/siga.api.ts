import type { IncomingHttpHeaders } from "http2";
import { request } from "urllib";

import { BASE_URL, ROUTES, USER_AGENT, GX_STATE, STATUS_REDIRECT, AUTH_COOKIE_FIELD_NAME } from "./siga.consts";

interface BuildRequestProps {
	method: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';
	route: keyof typeof ROUTES;
	headers?: IncomingHttpHeaders;
	data?: any;
}

interface GetRequestProps {
	route: BuildRequestProps['route'];
	token: string;
	headers?: IncomingHttpHeaders;
}

interface PostRequestProps {
	route: BuildRequestProps['route'];
	data?: any;
}

export function buildRequest({
	method,
	route,
	headers,
	data
}: BuildRequestProps) {
	headers = {
		...headers,
		'user-agent': USER_AGENT,
		origin: BASE_URL,
	};

	const url = route.startsWith('http')
		? route
		: `${BASE_URL}${ROUTES[route]}`;

	if (method.toLowerCase() === 'post') {
		headers['content-type'] = 'application/x-www-form-urlencoded';
		data = { ...data, GX_STATE };
	}

	return {
		url,
		options: {
			data,
			headers,
			method,
			maxRedirects: 0,
		}
	};
}

export async function get({ route, token, headers={} }: GetRequestProps) {
	const req = buildRequest({
		route,
		method: 'GET',
		headers: {
			cookie: `${AUTH_COOKIE_FIELD_NAME}=${token}`,
			...headers
		}
	});

	const { data, res } = await request(req.url, req.options);

	return {
		data: data.toString('utf-8'),
		success: res.statusCode !== STATUS_REDIRECT,
	};
}

export async function post({ route, data }: PostRequestProps) {
	const req = buildRequest({
		method: 'POST',
		route,
		data
	});

	return await request(req.url, req.options);
}