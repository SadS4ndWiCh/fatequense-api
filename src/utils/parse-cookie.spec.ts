import { parseCookie } from "./parse-cookie.utils";

describe('parse cookie utils function', () => {
	it('should be able parse cookie string to object', () => {
		const parsedCookie = parseCookie('foo=bar; httpOnly');

		expect(parsedCookie.foo).toBe('bar');
		expect(parsedCookie.httpOnly).toBe(true);
	})
});