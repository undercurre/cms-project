// src/userquestionrecord/userquestionrecord.controller.ts

import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import { UserQuestionRecordService } from './userquestionrecord.service';
import { UserQuestionRecord } from './userquestionrecord.entity';
import { User } from '../users/user.entity';

@Controller('userquestionrecords')
export class UserQuestionRecordController {
  constructor(
    private readonly userQuestionRecordService: UserQuestionRecordService,
  ) {}

  @Post()
  createUserQuestionRecord(
    @Req() request: Express.Request,
    @Body() recordData: Partial<UserQuestionRecord>,
  ) {
    const user = request.user as User;
    return this.userQuestionRecordService.createUserQuestionRecord({
      ...recordData,
      userId: user.id,
    });
  }

  @Get()
  getAllUserQuestionRecords() {
    return this.userQuestionRecordService.getAllUserQuestionRecords();
  }

  @Get('getById/:id')
  getUserQuestionRecordById(@Param('id') id: string) {
    return this.userQuestionRecordService.getUserQuestionRecordById(id);
  }

  @Get('getByUserId')
  getUserQuestionRecordByUserId(@Req() request: Express.Request) {
    const user = request.user as User;

    return this.userQuestionRecordService.getUserQuestionRecordByUserId(
      user.id,
    );
  }

  @Put(':id')
  updateUserQuestionRecord(
    @Param('id') id: string,
    @Body() recordData: Partial<UserQuestionRecord>,
  ) {
    return this.userQuestionRecordService.updateUserQuestionRecord(
      id,
      recordData,
    );
  }

  @Delete(':id')
  deleteUserQuestionRecord(@Param('id') id: string) {
    return this.userQuestionRecordService.deleteUserQuestionRecord(id);
  }
}
