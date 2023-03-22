import { onRequestHookHandler } from "fastify"
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import * as jwt from '~/utils/jwt.utils';

import { getAuthorizationToken } from "~/utils/get-authorization-token.utils"
import { AuthorizationTokenExpired } from "~/libs/siga/errors/AuthorizationTokenExpired.error";
import { InvalidAuthorizationToken } from "~/libs/siga/errors/InvalidAuthorizationToken.error";
import { MissingAuthorizationToken } from "~/libs/siga/errors/MissingAuthorizationToken.error";

type UseAuthResponse = {
	isAuthenticated: onRequestHookHandler,
}

export function useAuth(): UseAuthResponse {
	return {
		isAuthenticated(req, reply, done) {
			const token = getAuthorizationToken(req.headers);
			if (!token) throw new MissingAuthorizationToken();

			try {
				const payload = jwt.verify({ token });

				req.headers.token = payload!.session;
				done();
			} catch (err) {
				if (err instanceof TokenExpiredError)
					throw new AuthorizationTokenExpired();

				else if (err instanceof JsonWebTokenError)
					throw new InvalidAuthorizationToken();
				
				throw err;
			}
		}
	}
}