import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
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

  @Get('list')
  async list() {
    return await this.userService.list();
  }

  @Put('update')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto.username);
  }

  @Delete('delete')
  remove(@Query('id') id: number) {
    return this.userService.remove(id);
  }
}
