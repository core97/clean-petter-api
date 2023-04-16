import { Response } from 'express';
import { HttpStatus } from '@shared/application/http/http-status';

export abstract class ExpressHttpHandler {
  protected jsonResponse(res: Response, code: HttpStatus, message?: string) {
    if (message) {
      return res.status(code).json({ message });
    }

    return res.status(code).end();
  }

  protected ok<T>(res: Response, dto?: T) {
    if (dto) {
      return res.status(HttpStatus.OK).json(dto);
    }

    return res.status(HttpStatus.OK).end();
  }

  protected created(res: Response) {
    return res.status(HttpStatus.CREATED).end();
  }

  protected clientError(res: Response, message?: string) {
    return this.jsonResponse(res, HttpStatus.BAD_REQUEST, message);
  }

  protected unauthorized(res: Response, message?: string) {
    return this.jsonResponse(res, HttpStatus.UNAUTHORIZATED, message);
  }

  protected forbidden(res: Response, message?: string) {
    return this.jsonResponse(res, HttpStatus.FORBIDDEN, message);
  }

  protected notFound(res: Response, message?: string) {
    return this.jsonResponse(res, HttpStatus.NOT_FOUND, message);
  }

  protected conflict(res: Response, message?: string) {
    return this.jsonResponse(res, HttpStatus.CONFLICT, message);
  }

  protected invalidParams(res: Response, message?: string) {
    return this.jsonResponse(res, HttpStatus.UNPROCESSABLE_ENTITY, message);
  }

  protected fail(res: Response, error?: Error | string) {
    return res.status(HttpStatus.INTERNAL_ERROR).json({
      ...(error && { message: error.toString() }),
    });
  }

  protected parseQueryString(queryString?: unknown): string[] {
    if (!queryString) return [];

    return Array.isArray(queryString)
      ? queryString
      : [queryString].filter(Boolean);
  }
}
