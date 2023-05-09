import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, WechatAuthDto } from './user.dto';
import { UserService } from './user.service';
import { Public } from '../auth/public.decorator';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(
      createUserDto.username,
      createUserDto.password,
    );
  }

  @Get('fineOne')
  async findOne(@Param('id') id: number) {
    return await this.userService.findOne(id);
  }

  @Put('update')
  update(@Param() id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto.username);
  }

  @Delete('delete')
  remove(@Param() id: number) {
    return this.userService.remove(id);
  }

  @Public()
  @Post('wechat/auth')
  wechatAuth(@Body() wechatAuthDto: WechatAuthDto) {
    return this.userService.wechatAuth(wechatAuthDto.code);
  }
}
