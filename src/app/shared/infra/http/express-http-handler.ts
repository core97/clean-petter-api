import { Response } from 'express';
import { HttpStatus } from '@shared/application/http/http-status';

export abstract class ExpressHttpHandler {
  jsonResponse(res: Response, code: HttpStatus, message?: string) {
    if (message) {
      return res.status(code).json({ message });
    }

    return res.status(code).end();
  }

  ok<T>(res: Response, dto?: T) {
    if (dto) {
      return res.status(HttpStatus.OK).json(dto);
    }

    return res.status(HttpStatus.OK).end();
  }

  created(res: Response) {
    return res.status(HttpStatus.CREATED).end();
  }

  clientError(res: Response, message?: string) {
    return this.jsonResponse(res, HttpStatus.BAD_REQUEST, message);
  }

  unauthorized(res: Response, message?: string) {
    return this.jsonResponse(res, HttpStatus.UNAUTHORIZATED, message);
  }

  forbidden(res: Response, message?: string) {
    return this.jsonResponse(res, HttpStatus.FORBIDDEN, message);
  }

  notFound(res: Response, message?: string) {
    return this.jsonResponse(res, HttpStatus.NOT_FOUND, message);
  }

  conflict(res: Response, message?: string) {
    return this.jsonResponse(res, HttpStatus.CONFLICT, message);
  }

  invalidParams(res: Response, message?: string) {
    return this.jsonResponse(res, HttpStatus.UNPROCESSABLE_ENTITY, message);
  }

  fail(res: Response, error?: Error | string) {
    return res.status(HttpStatus.INTERNAL_ERROR).json({
      ...(error && { message: error.toString() }),
    });
  }
}
