import { HttpStatus } from '@shared/application/http/http-status';

export enum HttpErrorCode {
  CONFLICT = 'CONFLICT',
  FORBIDDEN = 'FORBIDDEN',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  PAYLOAD_TOO_LARGE = 'PAYLOAD_TOO_LARGE',
  UNAUTHORIZATED = 'UNAUTHORIZATED',
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
}

export const ERROR_CODE_TO_HTTP_STATUS: Record<HttpErrorCode, HttpStatus> = {
  [HttpErrorCode.CONFLICT]: HttpStatus.CONFLICT,
  [HttpErrorCode.FORBIDDEN]: HttpStatus.FORBIDDEN,
  [HttpErrorCode.INTERNAL_ERROR]: HttpStatus.INTERNAL_ERROR,
  [HttpErrorCode.PAYLOAD_TOO_LARGE]: HttpStatus.PAYLOAD_TOO_LARGE,
  [HttpErrorCode.NOT_FOUND]: HttpStatus.NOT_FOUND,
  [HttpErrorCode.UNAUTHORIZATED]: HttpStatus.UNAUTHORIZATED,
  [HttpErrorCode.UNPROCESSABLE_ENTITY]: HttpStatus.UNPROCESSABLE_ENTITY,
};
