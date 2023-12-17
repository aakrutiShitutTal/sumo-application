// custom-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { QueryFailedError, EntityNotFoundError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError, EntityNotFoundError, BadRequestException, NotFoundException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError | EntityNotFoundError | BadRequestException | NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';

    if (exception instanceof QueryFailedError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Bad Request: Database operation failed.';
    } else if (exception instanceof EntityNotFoundError) {
      status = HttpStatus.NOT_FOUND;
      message = 'Not Found: Entity not found.';
    }else if(exception instanceof BadRequestException) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    } else if(exception instanceof NotFoundException) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
