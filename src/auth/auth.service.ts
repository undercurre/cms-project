/*
 * @Author: undercurre undercurre@163.com
 * @Date: 2023-05-02 17:13:20
 * @LastEditors: undercurre undercurre@163.com
 * @LastEditTime: 2023-06-18 03:43:08
 * @FilePath: \cms-project\src\auth\auth.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
  ) {}

  // 假设有一个黑名单存储已注销的令牌
  private tokenBlacklist: Set<string> = new Set();

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByName(username);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserByToken(token: string): Promise<User | null> {
    let isInBlacklist = false;
    try {
      // 检查令牌是否在黑名单中
      if (this.tokenBlacklist.has(token)) {
        isInBlacklist = true;
        throw new UnauthorizedException('Token has been blacklisted');
      }
      const payload = this.jwtService.verify(token);
      const userId = payload.sub;
      const user = await this.usersService.findOne(userId);
      return user;
    } catch (error) {
      if (isInBlacklist) {
        throw new UnauthorizedException('Token has been blacklisted');
      } else {
        throw new UnauthorizedException('Token is not valid');
      }
    }
  }

  // 生成带有过期时间的 JWT 令牌
  logout(token: string): void {
    // 将令牌添加到黑名单
    this.tokenBlacklist.add(token);
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async wechatAuth(code: string) {
    const APPID = 'wx7283eac281febaaf';
    const SECRET = '82d4a64f10cf7f9bb04d769d696011c0';
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`;
    const response = await this.httpService.get(url).toPromise();
    const data = response.data;
    if (data.openid) {
      const userBeen = await this.usersService.findOneByOpenid(data.openid);
      if (userBeen) {
        // 如果在库里找到openid的用户，即刻登录该用户
        const payload = { username: userBeen.username, sub: userBeen.id };
        return {
          id: userBeen.id,
          access_token: this.jwtService.sign(payload),
        };
      } else {
        // 如果
        const userNewn = await this.usersService.wechatCreate(data.openid);
        const payload = { username: userNewn.username, sub: userNewn.id };
        return {
          id: userNewn.id,
          access_token: this.jwtService.sign(payload),
        };
      }
    } else {
      return {
        ...data,
        msg: 'code已经被使用过了',
      };
    }
  }
}
