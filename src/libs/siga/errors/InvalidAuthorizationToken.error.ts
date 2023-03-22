import { SigaError } from "./SigaError.error";

export class InvalidAuthorizationToken extends SigaError {
	constructor () {
		super();
		this.statusCode = 401,
		this.errorMessage = 'Invalid authorization token. Provide the correct authorization token or login to create another.';
	}
}