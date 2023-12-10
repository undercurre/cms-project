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
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

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
  findByUserId(@Query('userId') userId: string): Promise<Task[]> {
    return this.taskService.findByUserId(userId);
  }

  @Post('create')
  create(@Body() taskData: Partial<Task>): Promise<Task> {
    return this.taskService.create(taskData);
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
