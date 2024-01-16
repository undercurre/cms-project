import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQuestionRecordService } from './userquestionrecord.service';
import { UserQuestionRecordController } from './userquestionrecord.controller';
import { UserQuestionRecord } from './userquestionrecord.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([UserQuestionRecord]), HttpModule],
  providers: [UserQuestionRecordService],
  controllers: [UserQuestionRecordController],
  exports: [UserQuestionRecordService],
})
export class UserQuestionRecordModule {}
