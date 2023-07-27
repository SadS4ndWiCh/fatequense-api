import { FastifyRequest } from 'fastify';

import { getAuthorizationToken } from '~/utils/get-authorization-token.utils';

export const THREE_HOURS_IN_SECONDS = 60 * 60 * 3;

export const cacheKey = (req: FastifyRequest) => {
  const token = getAuthorizationToken(req.headers);

  if (!token || req.routerPath.includes('/disciplines/:code')) return null;

  return `${token}-${req.routerPath}`;
};

export const cacheOptions = {
  expireIn: THREE_HOURS_IN_SECONDS,
};
