/*
 * @Author: undercurre undercurre@163.com
 * @Date: 2023-06-18 01:42:57
 * @LastEditors: undercurre undercurre@163.com
 * @LastEditTime: 2023-06-18 05:17:30
 * @FilePath: \cms-project\src\middleware\auth.middleware.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
