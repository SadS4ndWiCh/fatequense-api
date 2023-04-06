import { SigaError } from "./siga-error.error";

export class FailedToLogout extends SigaError {
	public statusCode = 500;
	public errorTitle = 'Failed to Logout.'
	public errorMessage = 'An unexpected error occurred, unable to logout. Try again soon.'
}