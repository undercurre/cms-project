// task.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { User } from '../users/user.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('list')
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get('fineOne')
  findOne(@Query('id') id: string): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Get('findByUserId')
  findByUserId(@Req() request: Express.Request): Promise<Task[]> {
    const user = request.user as User;
    return this.taskService.findByUserId(user.id);
  }

  @Post('create')
  create(
    @Req() request: Express.Request,
    @Body() taskData: Partial<Task>,
  ): Promise<Task> {
    const user = request.user as User;
    return this.taskService.create({ ...taskData, user_id: user.id });
  }

  @Put('update')
  update(
    @Query('id') id: string,
    @Body() taskData: Partial<Task>,
  ): Promise<Task> {
    return this.taskService.update(id, taskData);
  }

  @Delete('delete')
  remove(@Query('id') id: string): Promise<void> {
    return this.taskService.remove(id);
  }
}
