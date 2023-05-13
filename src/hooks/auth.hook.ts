import type { onRequestHookHandler } from 'fastify';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

import { AuthorizationTokenExpired } from '~/libs/siga/errors/authorization-token-expired.error';
import { InvalidAuthorizationToken } from '~/libs/siga/errors/invalid-authorization-token.error';
import { MissingAuthorizationToken } from '~/libs/siga/errors/missing-authorization-token.error';

import { getAuthorizationToken } from '~/utils/get-authorization-token.utils';
import * as jwt from '~/utils/jwt.utils';

type UseAuthResponse = {
  isAuthenticated: onRequestHookHandler;
};

export function useAuth(): UseAuthResponse {
  return {
    isAuthenticated(req, reply, done) {
      const token = getAuthorizationToken(req.headers);
      if (!token) throw new MissingAuthorizationToken();

      try {
        const payload = jwt.verify({ token });

        req.headers.token = payload.session;
        done();
      } catch (err) {
        if (err instanceof TokenExpiredError)
          throw new AuthorizationTokenExpired();
        else if (err instanceof JsonWebTokenError)
          throw new InvalidAuthorizationToken();

        throw err;
      }
    },
  };
}
