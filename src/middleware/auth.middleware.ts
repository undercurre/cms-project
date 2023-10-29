import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const [bearer, token] = authorizationHeader.split(' ');
      if (token) {
        const user = await this.authService.validateUserByToken(token);
        if (user) {
          req.user = user; // 将用户对象附加到请求对象的 user 属性上
        }
      }
    }
    next();
  }
}
