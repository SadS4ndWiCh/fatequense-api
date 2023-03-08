import { IncomingHttpHeaders } from "http2";

export function getAuthorizationToken(headers: IncomingHttpHeaders) {
	if (!headers.authorization) return null;

	return headers.authorization.replace('Bearer ', '');
}