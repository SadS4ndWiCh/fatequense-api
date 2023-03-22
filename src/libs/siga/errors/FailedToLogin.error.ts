import { SigaError } from "./SigaError.error";

export class FailedToLogin extends SigaError {
	constructor() {
		super();

		this.statusCode = 400;
		this.errorMessage = 'Failed to login. Username or password are incorrect.'
	}
}