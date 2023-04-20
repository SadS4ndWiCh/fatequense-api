import { SigaError } from "./siga-error.error";

export class AuthorizationTokenExpired extends SigaError {
	public statusCode = 401;
	public errorTitle = 'Authorization Token has Expired.';
	public errorMessage = 'Please login again to create another token.';
}