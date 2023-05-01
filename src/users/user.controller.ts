import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

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
    console.log(id, updateUserDto);
    return this.userService.update(id, updateUserDto.username);
  }

  @Delete('delete')
  remove(@Param() id: number) {
    console.log(id);
    return this.userService.remove(id);
  }
}
