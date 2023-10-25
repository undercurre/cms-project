import { AuthService } from './auth/auth.service';
import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './auth/public.decorator';
import { WechatAuthDto } from './users/user.dto';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Public()
  @Post('auth/login')
  @HttpCode(200)
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('auth/logout') // 你可以根据需求指定一个合适的URL路径
  @HttpCode(200)
  async logout(@Req() req) {
    // 获取当前请求中的JWT令牌
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const [bearer, token] = authorizationHeader.split(' ');
      if (token) {
        // 调用AuthService中的logout方法将令牌添加到黑名单中
        this.authService.logout(token);
        return { message: '成功注销' };
      } else {
        return { message: '无法注销：令牌未提供' };
      }
    }
  }

  @Public()
  @Post('wechat/login')
  @HttpCode(200)
  wechatAuth(@Body() wechatAuthDto: WechatAuthDto) {
    return this.authService.wechatAuth(wechatAuthDto.code);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req) {
    const { id, username } = req.user;
    return { id, username };
  }
}
