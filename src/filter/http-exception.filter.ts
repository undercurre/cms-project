import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();

    if (exception instanceof UnauthorizedException) {
      if (exception.message === 'Token has been blacklisted') {
        response
          .status(200)
          .json({ code: 401, message: 'Token has been blacklisted' })
          .status(401);
      } else {
        response
          .status(200)
          .json({ code: 401, message: 'Token is not valid' })
          .status(401);
      }
    } else {
      response.status(status).json({
        code: status,
        error: exception.getResponse(),
      });
    }
  }
}
