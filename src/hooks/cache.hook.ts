import { onResponseHookHandler, onSendHookHandler } from "fastify";
import NodeCache from 'node-cache';

import { getAuthorizationToken } from "~/libs/siga/siga.utils";

type UseCacheResponse = {
	onRequest: onResponseHookHandler,
	onSend: onSendHookHandler<unknown>,
}

const CACHE_TTL = 15;

function createCache() {
	const cache = new NodeCache();

	return {
		get: (key: string) => cache.get(key),
		set: (key: string, value: unknown) => cache.set(key, value, CACHE_TTL),
	}
}

export function useCache(): UseCacheResponse {
	const cache = createCache();

	return {
		onRequest(req, reply, done) {
			if (req.method !== 'GET') return done();

			const token = getAuthorizationToken(req.headers);
			if (token === null) return done();

			const response = cache.get(token);
			if (!response) return done();

			return reply
				.status(200)
				.header('Content-Type', 'application/json; charset=utf-8')
				.send(response);
		},

		onSend(req, res, payload, done) {
			if (req.method !== 'GET') return done();

			const token = getAuthorizationToken(req.headers);
			if (token === null) return done();

			cache.set(token, payload);
			done();
		}
	}
}