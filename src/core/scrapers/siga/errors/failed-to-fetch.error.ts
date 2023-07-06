import { SigaError } from './siga-error.error';

export class FailedToFetch extends SigaError {
  public statusCode = 400;
  public errorTitle = 'SIGA page not reached';
  public errorMessage = 'The authorization token expires or it missing?';
}
