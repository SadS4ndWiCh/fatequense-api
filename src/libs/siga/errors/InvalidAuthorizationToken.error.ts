import { SigaError } from "./SigaError.error";

export class InvalidAuthorizationToken extends SigaError {
	public statusCode = 401;
	public errorTitle = 'Invalid Authorization Token.';
	public errorMessage = 'Provide the correct authorization token or login to create another.';
}