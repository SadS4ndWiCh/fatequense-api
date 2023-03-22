import { SigaError } from "./SigaError.error";

export class MissingAuthorizationToken extends SigaError {
	constructor () {
		super();
		
		this.statusCode = 401;
		this.errorMessage = 'Missing authorization token. Provide the authorization token or login to create another.';
	}
}