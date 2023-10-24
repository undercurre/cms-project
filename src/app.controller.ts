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
