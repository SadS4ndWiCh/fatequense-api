import { sign as jwtSign, verify as jwtVerify, decode as jwtDecode, JwtPayload } from "jsonwebtoken";
import type { VerifyOptions, Algorithm, SignOptions } from "jsonwebtoken";

import { env } from "./env.utils";

type SignProps = {
	payload: string | object | Buffer,
	options?: SignOptions
}

type VerifyProps = Omit<SignProps, 'payload'> & {
	token: string;
};

export function sign({ payload, options }: SignProps) {
	const jwtOptions: SignOptions = {
		expiresIn: env.JWT_EXPIRES_IN,
		algorithm: env.JWT_ALGORITHM as Algorithm,
		...options
	};

	return jwtSign(payload, env.JWT_SECRET_KEY, jwtOptions);
}

export function verify({ token, options }: VerifyProps) {
	const jwtOptions: VerifyOptions = {
		algorithm: [env.JWT_ALGORITHM as Algorithm],
		...options
	};

	return jwtVerify(token, env.JWT_SECRET_KEY, jwtOptions) as JwtPayload;
}