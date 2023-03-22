import { SigaError } from "./SigaError.error";

export class AuthorizationTokenExpired extends SigaError {
	constructor() {
		super();

		this.statusCode = 401;
		this.errorMessage = 'The authorization token expires. Please login again to create another token.';
	}
}