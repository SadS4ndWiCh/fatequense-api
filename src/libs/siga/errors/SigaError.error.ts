export class SigaError extends Error {
	public statusCode: number = 500;
	public errorMessage: string = 'Internal Server Error';

	serialize() {
		return {
			statusCode: this.statusCode,
			error: this.errorMessage
		}
	}
}