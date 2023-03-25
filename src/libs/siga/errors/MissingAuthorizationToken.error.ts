import { SigaError } from "./SigaError.error";

export class MissingAuthorizationToken extends SigaError {
	public statusCode = 401;
	public errorTitle = 'Missing Authorization Token.';
	public errorMessage = 'Provide the authorization token or login to create another.';
	
}