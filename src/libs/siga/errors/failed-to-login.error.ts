import { SigaError } from "./siga-error.error";

export class FailedToLogin extends SigaError {
	public statusCode = 400;
	public errorTitle = 'Failed to Login.'
	public errorMessage = 'Username or password are incorrect.'
}