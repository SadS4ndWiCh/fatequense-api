import { SigaError } from "./SigaError.error";

export class DisciplineNotFound extends SigaError {
	public statusCode = 404;
	public errorTitle = 'Discipline Not Found';
	public errorMessage = 'You are not enrolled in this subject or it is invalid.';
}