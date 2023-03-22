import { SigaError } from "./SigaError.error";

export class FailedToFetch extends SigaError {
	constructor() {
		super();

		this.statusCode = 400;
		this.errorMessage = 'Could not reach the Siga page. The authorization token expires or it missing?';
	}
}